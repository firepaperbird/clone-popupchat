import { sortBy } from 'lodash';
import React, { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

import { MESSAGE_TYPES } from '../../enum/message';
import { color } from '../../enum/theme';
import ConversationSelector from '../../redux/conversation/conversation.selector';
import MessageSelector from '../../redux/message/message.selector';
import Typing from '../common/Loading/Typing';
import LiveChatMessage from './LiveChatMessage';

import { LiveChatContentWrapper, TypingWrapper } from './styled';

const LiveChatWidgetContents: React.FC = () => {
  const messages = useSelector(MessageSelector.selectDataList);
  const isTyping = useSelector(ConversationSelector.selectIsTyping);

  const messageWrapper = useRef<HTMLDivElement>(null);

  const messageData = useMemo(
    () =>
      sortBy(messages, 'createdAt').filter(
        (message) =>
          message.type !== MESSAGE_TYPES.SMS &&
          message.type !== MESSAGE_TYPES.SYSTEM &&
          message.type !== MESSAGE_TYPES.INTERNAL,
      ),
    [messages],
  );

  useEffect(() => {
    if (messageWrapper.current) {
      messageWrapper.current.scrollTop = messages.length * 100;
    }
  }, []);

  useEffect(() => {
    if (messages.length > 7 && messageWrapper.current) {
      messageWrapper.current.scrollTop = messages.length * 100;
    }
  }, [messages.length, messageWrapper.current]);

  return (
    <LiveChatContentWrapper ref={messageWrapper}>
      <div className='messageBody'>
        {messageData.map((message) => (
          <LiveChatMessage key={message.id} {...message} />
        ))}
        {isTyping && <LiveChatMessage typing />}
      </div>
      {isTyping && (
        <TypingWrapper>
          <span>Agent is typing</span> <Typing color={color.primary} />
        </TypingWrapper>
      )}
    </LiveChatContentWrapper>
  );
};

export default LiveChatWidgetContents;
