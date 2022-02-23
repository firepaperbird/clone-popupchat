/* eslint-disable no-undef */
/* eslint-disable camelcase */
import React, { useCallback, useMemo } from 'react';
import { Form, Input, InputNumber, Button, Select, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import FieldSelector from '../../redux/field/field.selector';
import GroupSelector from '../../redux/group/group.selector';
import LiveChatFieldAction from '../../redux/livechat-field/livechat-field.action';
import { REQUIRED_FIELD, VIEW } from '../../enum/livechat';
import { CUSTOM_FIELD_TYPE, PHONE_CODE, CUSTOM_FIELD_NAME } from '../../enum/field';

import { LiveChatGroupSettingFormProps } from '../../types';
import { LiveChatGroupSettingFormWrapper, CenterItem, IntroduceWrapper, TermsWrapper } from './styled';
import GeneralAction from '../../redux/general/general.action';
import { encodePhone, privateKey } from '../../utils';
import { color } from '../../enum/theme';
import TextArea from 'antd/lib/input/TextArea';

const prefixPhoneNumber = (
  <Form.Item name='prefix' noStyle>
    <Select style={{ width: 70 }} defaultValue='US'>
      {Object.keys(PHONE_CODE)
        .sort()
        .map((key) => (
          <Select.Option key={key} value={`${PHONE_CODE[key].toString()}`}>
            {key.toUpperCase()}
          </Select.Option>
        ))}
    </Select>
  </Form.Item>
);

const LiveChatGroupSettingFormItem: React.FC<{ [key: string]: any }> = (props) => {
  const { id, custom_field_name, custom_field_type, custom_field_options = [] } = props;

  switch (custom_field_type) {
    case CUSTOM_FIELD_TYPE.PHONE:
      return (
        <Form.Item key={id} name={id} rules={[{ required: true, message: `Please input your ${custom_field_name}.` }]}>
          <Input addonBefore={prefixPhoneNumber} style={{ width: '100%' }} placeholder='Phone Number' />
        </Form.Item>
      );
    case CUSTOM_FIELD_TYPE.NUMBER:
      return (
        <Form.Item key={id} name={id} rules={[{ required: true, message: `Please input your ${custom_field_name}.` }]}>
          <InputNumber style={{ width: '100%' }} placeholder={custom_field_name} />
        </Form.Item>
      );
    case CUSTOM_FIELD_TYPE.EMAIL:
      return (
        <Form.Item key={id} name={id} rules={[{ required: true, message: `Please input your ${custom_field_name}.` }]}>
          <Input type='email' placeholder={custom_field_name} />
        </Form.Item>
      );
    case CUSTOM_FIELD_TYPE.STRING:
      return (
        <Form.Item key={id} name={id} rules={[{ required: true, message: `Please input your ${custom_field_name}.` }]}>
          <Input placeholder={custom_field_name} />
        </Form.Item>
      );
    case CUSTOM_FIELD_TYPE.TEXT_AREA:
      return (
        <Form.Item key={id} name={id} rules={[{ required: true, message: `Please input your ${custom_field_name}.` }]}>
          <TextArea placeholder={custom_field_name} />
        </Form.Item>
      );
    case CUSTOM_FIELD_TYPE.SELECTORS:
      return (
        <Form.Item key={id} name={id} rules={[{ required: true, message: `Please input your ${custom_field_name}.` }]}>
          <Select placeholder={custom_field_name}>
            {custom_field_options?.map((option: string) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      );
    case CUSTOM_FIELD_TYPE.DATE:
      return (
        <Form.Item key={id} name={id} rules={[{ required: true, message: `Please input your ${custom_field_name}.` }]}>
          <DatePicker style={{ width: '100%' }} placeholder={custom_field_name} />
        </Form.Item>
      );
    default:
      return null;
  }
};
const LiveChatGroupSettingForm: React.FC<LiveChatGroupSettingFormProps> = (props) => {
  const dispatch = useDispatch();
  const fields = useSelector(FieldSelector.selectDataList);
  const isNewInboundConversation = useSelector(GroupSelector.selectNewInboundConversationWorkflow);
  const groups = useSelector(GroupSelector.selectDataList);

  const onSubmit = useCallback(
    (values) => {
      const liveChatFields = Object.keys(values)
        .map((key) => {
          let value = values[key];
          const field = fields.find((item) => item.id === key);
          if (field?.custom_field_name === CUSTOM_FIELD_NAME.phone) {
            value = encodePhone(values.prefix || '1', value);
          }
          return { id: key, value };
        })
        .filter((item) => item.id !== 'prefix');

      if (isNewInboundConversation) {
        // if (hasRequiredFields) {
        FingerprintJS.load()
          .then((fp) => fp.get())
          .then((result) => {
            const fingerprint = result.visitorId;
            dispatch(
              LiveChatFieldAction.checkRequiredFields(liveChatFields, `${fingerprint}`, (error, { conversation }) => {
                if (!error) {
                  dispatch(LiveChatFieldAction.checkNewInboundConversation(groups[0].id, conversation.id));
                }
              }),
            );
          });
        // }
      } else {
        dispatch(LiveChatFieldAction.setLiveChatFieldsForm(liveChatFields));
      }
      dispatch(GeneralAction.setView(VIEW.CHAT));
    },
    [dispatch, fields],
  );

  const onFinishFailed = useCallback(
    (errorInfo) => {
      console.log('Failed:', errorInfo);
      // dispatch(GeneralAction.setView(VIEW.CHAT));
    },
    [dispatch],
  );

  const primaryColors = useMemo(() => [color.primary, color.primary2, color.getTextColor()], [
    color.primary,
    color.primary2,
  ]);

  return (
    <LiveChatGroupSettingFormWrapper primaryColor={primaryColors[0]} textColor={primaryColors[2]}>
      {groups[0]?.liveChat_intro && <IntroduceWrapper>{groups[0]?.liveChat_intro}</IntroduceWrapper>}

      <Form onFinish={onSubmit} onFinishFailed={onFinishFailed}>
        {fields?.map((field) => (
          <LiveChatGroupSettingFormItem key={field.id} {...field} />
        ))}
        {groups[0]?.liveChat_terms && <TermsWrapper>{groups[0]?.liveChat_terms}</TermsWrapper>}
        <CenterItem>
          <Button htmlType='submit'>Start Chat</Button>
        </CenterItem>
      </Form>
    </LiveChatGroupSettingFormWrapper>
  );
};

export default LiveChatGroupSettingForm;
