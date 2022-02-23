/* eslint-disable multiline-ternary */
/* eslint-disable camelcase */
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Skeleton } from 'antd';
import { DownloadOutlined, CheckCircleTwoTone, SyncOutlined, WarningOutlined } from '@ant-design/icons';

import UserSelector from '../../redux/user/user.selector';
import MessageSelector from '../../redux/message/message.selector';
import Typing from '../common/Loading/Typing';
import { color } from '../../enum/theme';
import { checkImageExtensions, getFullName } from '../../utils';
import { LiveChatMessageProps, LiveChatMessageAttachmentProps } from '../../types';
import {
  LiveChatMessageWrapper,
  LiveChatMessageInfo,
  LiveChatMessageContent,
  LiveChatAttachmentWrapper,
  LiveChatSendingStatusWrapper,
  LiveChatSkeleton,
} from './styled';

const LiveChatMessageAttachment: React.FC<LiveChatMessageAttachmentProps> = (props) => {
  const { pipeFrom, name, extension, outgoingMessage } = props;
  const isImage = checkImageExtensions(extension);

  if (isImage) {
    return (
      <LiveChatAttachmentWrapper>
        <a target='_blank' href={pipeFrom}>
          <img src={pipeFrom} alt='' />
        </a>
      </LiveChatAttachmentWrapper>
    );
  }
  const primaryColors = useMemo(() => [color.primary, color.primary2], [color.primary, color.primary2]);

  return (
    <LiveChatMessageContent pcolor={primaryColors[0]} outgoingMessage={outgoingMessage} attachment>
      <a href={pipeFrom} target='_blank' rel='noopener noreferrer'>
        <DownloadOutlined /> <span>{name}</span>
      </a>
    </LiveChatMessageContent>
  );
};

const LiveChatMessage: React.FC<LiveChatMessageProps> = (props) => {
  const {
    _from,
    message,
    file,
    typing,
    isSending,
    isSendingFailed,
    created_by_campaign,
    created_by_workflow,
    isIntro,
  } = props;
  const outgoingMessage = !!_from || created_by_campaign || created_by_workflow;

  const isFetchingMessage = useSelector(MessageSelector.selectIsFetching);
  const users = useSelector(UserSelector.selectDataById);
  const user = _from && users[_from];

  const renderTitle = () => {
    if (created_by_campaign) {
      return <LiveChatMessageInfo>Chat Bot</LiveChatMessageInfo>;
    }
    if (created_by_workflow) {
      return <LiveChatMessageInfo>Chat Bot</LiveChatMessageInfo>;
    }

    if (outgoingMessage) {
      return <LiveChatMessageInfo>{user ? getFullName(user) : _from}</LiveChatMessageInfo>;
    }

    return <LiveChatMessageInfo>You</LiveChatMessageInfo>;
  };
  const primaryColors = useMemo(() => [color.primary, color.primary2], [color.primary, color.primary2]);

  if (typing) {
    return (
      <LiveChatMessageWrapper outgoingMessage>
        <LiveChatMessageContent pcolor={primaryColors[0]} outgoingMessage>
          <Typing />
        </LiveChatMessageContent>
      </LiveChatMessageWrapper>
    );
  }

  if (isFetchingMessage) {
    return (
      <LiveChatMessageWrapper outgoingMessage>
        <LiveChatSkeleton>
          <Skeleton active round paragraph={{ rows: 2 }} />
        </LiveChatSkeleton>
        <LiveChatSkeleton outgoingMessage>
          <Skeleton active round paragraph={{ rows: 1 }} />
        </LiveChatSkeleton>
      </LiveChatMessageWrapper>
    );
  }

  return (
    <LiveChatMessageWrapper outgoingMessage={outgoingMessage}>
      {renderTitle()}
      {file ? (
        <LiveChatMessageAttachment {...file} outgoingMessage={outgoingMessage} />
      ) : (
        <LiveChatMessageContent pcolor={primaryColors[0]} outgoingMessage={outgoingMessage}>
          {message}
        </LiveChatMessageContent>
      )}
      {!outgoingMessage && (
        <LiveChatSendingStatusWrapper>
          {isSending && !isSendingFailed && <SyncOutlined spin />}
          {!isSending && !isSendingFailed && <CheckCircleTwoTone twoToneColor={primaryColors[0]} /> }
          {isSendingFailed && <WarningOutlined style={{ color: '#ffbb00' }} />}
        </LiveChatSendingStatusWrapper>
      )}
    </LiveChatMessageWrapper>
  );
};

export default LiveChatMessage;
