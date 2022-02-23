import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, notification } from 'antd';
import { MinusOutlined, PhoneFilled, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../common/Modal';
import GeneralAction from '../../redux/general/general.action';
import ConversationAction from '../../redux/conversation/conversation.action';
import VoiceAction from '../../redux/voice/voice.action';
import GeneralSelector from '../../redux/general/general.selector';
import GroupSelector from '../../redux/group/group.selector';
import ConversationSelector from '../../redux/conversation/conversation.selector';
import { VIEW } from '../../enum/livechat';

import { LiveChatHeadAction, LiveChatHeadTitle, LiveChatWidgetHeaderWrapper } from './styled';
import { color } from '../../enum/theme';
// import style from './LiveChat.module.scss';

const LiveChatWidgetHeader: React.FC = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const position = useSelector(GeneralSelector.selectPosition);
  const view = useSelector(GeneralSelector.selectView);
  const groups = useSelector(GroupSelector.selectDataList);
  const conversation = useSelector(ConversationSelector.selectDataList)[0];
  const isClosedByAgent = useSelector(ConversationSelector.selectIsClosedByAgent);

  const setShowPopup = useCallback(
    (value) => {
      dispatch(GeneralAction.setShowPopup(value));
    },
    [dispatch],
  );
  const closeConversation = useCallback(() => {
    dispatch(ConversationAction.closeConversation(group.id));
    setModalVisible(false);
  }, [dispatch]);
  const makeCall = useCallback(() => {
    const extraHeaders = [`GroupId: 46dc62a9-8a00-466d-b7f1-62b352952103`, `ConversationId: ${conversation.id}`];

    // const { region_number, phone_number } = contact;
    // const phone = `+${region_number}${phone_number}`;

    const options = {
      media: {
        constraints: {
          audio: true,
          video: false,
        },
      },
      extraHeaders,
    };
    const uri = `sip:${conversation._contact}@voice.chatchilla.com`;

    dispatch(
      VoiceAction.apDailing({
        uri,
        options,
        type: 'dial',
      }),
    );
  }, [dispatch, conversation]);
  const showModal = useCallback(() => {
    setModalVisible(true);
  }, [modalVisible]);
  const hideModal = useCallback(() => {
    setModalVisible(false);
  }, [modalVisible]);

  useEffect(() => {
    if (isClosedByAgent) {
      notification.info({
        message: 'CONVERSATION CLOSED',
        description: 'Your agent has closed this conversation',
        // duration: 0,
        style: {
          borderRadius: 20,
        },
      });
    }
  }, [isClosedByAgent]);

  const group = groups[0] || { liveChat_header_text: '' };
  const headerText = group.liveChat_header_text;
  const isCallSupport = group?.liveChat_callSupport;
  const isChatView = view === VIEW.CHAT;
  const isGroupSettingView = view === VIEW.GROUP_SETTINGS;
  const primaryColors = useMemo(() => [color.primary, color.primary2, color.getTextColor()], [
    color.primary,
    color.primary2,
  ]);
  return (
    <LiveChatWidgetHeaderWrapper primaryColor={primaryColors[0]} primaryColor2={primaryColors[1]} position={position}>
      <LiveChatHeadTitle textColor={primaryColors[2]}>{headerText && headerText}</LiveChatHeadTitle>

      <LiveChatHeadAction textColor={primaryColors[2]}>
        {isChatView && isCallSupport && <Button icon={<PhoneFilled rotate={180} />} onClick={makeCall} />}

        <Button icon={<MinusOutlined />} onClick={() => setShowPopup(false)} />
        {isChatView && <Button className='endchat' icon={<CloseOutlined />} onClick={showModal} />}

        <Modal
          title='Do you really want to end chat session?'
          visible={modalVisible}
          onConfirm={closeConversation}
          onCancel={hideModal}
        />
      </LiveChatHeadAction>
    </LiveChatWidgetHeaderWrapper>
  );
};

export default LiveChatWidgetHeader;
