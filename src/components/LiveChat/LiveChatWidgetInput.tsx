/* eslint-disable multiline-ternary */
import React, { useCallback, useRef, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notification, Spin, Upload } from 'antd';
import { SmileOutlined, SendOutlined, PaperClipOutlined, LoadingOutlined } from '@ant-design/icons';
import { RcCustomRequestOptions } from 'antd/lib/upload/interface';
import { debounce, throttle } from 'lodash';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import Emoji, { EmojiType } from '../common/Emoji';
import CustomDropdown from '../common/Dropdown/CustomDropdown';
import CustomDropdownItem from '../common/Dropdown/CustomDropdownItem';
import MessageAction from '../../redux/message/message.action';
import SocketAction from '../../redux/socket/socket.action';
import GroupSelector from '../../redux/group/group.selector';
import MessageSelector from '../../redux/message/message.selector';
import ConversationSelector from '../../redux/conversation/conversation.selector';
import LiveChatFieldSelector from '../../redux/livechat-field/livechat-field.selector';
import LiveChatFieldAction from '../../redux/livechat-field/livechat-field.action';

import { LiveChatInputWrapper, LiveChatMessageAction } from './styled';
import 'emoji-mart/css/emoji-mart.css';
import { color } from '../../enum/theme';

const FILE_LIMI_SIZE_IN_BYTES = 1024 * 1024 * 25;

const LiveChatWidgetInput: React.FC = () => {
  const dispatch = useDispatch();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  const groups = useSelector(GroupSelector.selectDataList);
  const conversations = useSelector(ConversationSelector.selectDataList);
  const isSendingAttachment = useSelector(MessageSelector.selectIsSendingAttachment);
  const liveChatFields = useSelector(LiveChatFieldSelector.selectLiveChatFieldForm);
  const hasRequiredFields = useSelector(GroupSelector.selectHasRequired);

  const groupId = groups[0]?.id;
  const conversationId = conversations[0]?.id;
  const fingerprintJS = useMemo(() => FingerprintJS.load().then((fp) => fp.get()), []);

  const liveChatTyping = useCallback(
    (text, isTyping) => {
      dispatch(SocketAction.liveChatTypingEvent(groupId, conversationId, text, isTyping));
    },
    [groupId, conversationId, dispatch],
  );

  const dispatchFingerPrint = async (mess: string) => {
    const fingerprint = (await fingerprintJS).visitorId;
    dispatch(
      LiveChatFieldAction.checkFingerprint(`${fingerprint}`, liveChatFields, (error, data) => {
        if (!error) {
          dispatch(MessageAction.sendMessage({ message: mess }));
        }
      }),
    );
  };

  const handleSendMessage = useCallback(async () => {
    const fingerprint = (await fingerprintJS).visitorId;
    if (conversations.length === 0) {
      dispatch(
        LiveChatFieldAction.checkRequiredFields(liveChatFields, fingerprint, (error, _) => {
          if (!error) {
            dispatch(MessageAction.sendMessage({ message }));
          }
        }),
      );
      setMessage('');
    } else {
      if (message) {
        dispatch(
          MessageAction.sendMessage({ message }, (error, id) => {
            if (error) {
              // retry
              dispatch(
                LiveChatFieldAction.checkRequiredFields(liveChatFields, fingerprint, (error, _) => {
                  if (error) {
                    dispatch(MessageAction.removeMessage(id));
                  }
                }),
              );
            }
          }),
        );
        setMessage('');
      }
    }
  }, [message, dispatch]);

  const handlePutEmoji = useCallback(
    (emoji: EmojiType) => {
      if (textareaRef.current) {
        const emojiPos = textareaRef.current.selectionStart;
        const newMessage = `${message.slice(0, emojiPos)}${emoji.native}${message.slice(emojiPos)}`;

        setMessage(newMessage);
        setShowEmoji(false);
      }
    },
    [message, textareaRef],
  );

  const debounceLiveChatEndTyping = useCallback(
    debounce((event) => {
      liveChatTyping(event.target.value, false);
    }, 3000),
    [liveChatTyping],
  );

  const debounceLiveChatTyping = useCallback(
    throttle((event) => {
      liveChatTyping(event.target.value, true);
      debounceLiveChatEndTyping(event);
    }, 1000),
    [liveChatTyping],
  );

  const handleChange = useCallback(
    (event) => {
      setMessage(event.target.value);
      if (conversations.length > 0) {
        debounceLiveChatTyping(event);
      }
    },
    [message, handleSendMessage, debounceLiveChatTyping],
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.keyCode === 13 && event.which === 13 && !event.shiftKey) {
        setTimeout(() => handleSendMessage(), 0);
      }
    },
    [handleSendMessage],
  );

  const toggleEmoji = useCallback(() => {
    setShowEmoji(!showEmoji);
  }, [showEmoji]);

  const upload = useCallback(
    async ({ file }: RcCustomRequestOptions): Promise<void> => {
      if (file.size > FILE_LIMI_SIZE_IN_BYTES) {
        notification.error({
          message: 'File size limit exceeded error',
          description: 'The file you have selected is too large. The maximum size is 25MB.',
        });
      } else {
        dispatch(MessageAction.sendAttachment({ file }));
      }
    },
    [dispatch],
  );
  const primaryColors = useMemo(() => [color.primary, color.primary2, color.getTextColor()], [
    color.primary,
    color.primary2,
  ]);

  return (
    <LiveChatInputWrapper>
      <textarea
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={message}
        ref={textareaRef}
        placeholder='Your message here ...'
      />
      <LiveChatMessageAction textColor={primaryColors[2]} primaryColor={primaryColors[0]}>
        {showEmoji && <Emoji handlePutEmoji={handlePutEmoji} />}
        <CustomDropdown>
          <Upload showUploadList={false} customRequest={upload}>
            <CustomDropdownItem className='dropDownButton'>
              {isSendingAttachment ? (
                <Spin className='attachmentSpinner' indicator={<LoadingOutlined className='loadingIcon' />} />
              ) : (
                <PaperClipOutlined />
              )}
            </CustomDropdownItem>
          </Upload>
          <CustomDropdownItem className='dropDownButton' onClick={toggleEmoji}>
            <SmileOutlined />
          </CustomDropdownItem>
        </CustomDropdown>
        <button className='submit' onClick={handleSendMessage}>
          <SendOutlined />
        </button>
      </LiveChatMessageAction>
    </LiveChatInputWrapper>
  );
};

export default LiveChatWidgetInput;
