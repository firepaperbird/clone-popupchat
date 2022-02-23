import React, { Fragment, useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleFilled } from '@ant-design/icons';

import GeneralSelector from '../../redux/general/general.selector';
import GroupSelector from '../../redux/group/group.selector';
import GeneralAction from '../../redux/general/general.action';
import LiveChatWidgetBody from './LiveChatWidgetBody';
import LiveChatWidgetFooter from './LiveChatWidgetFooter';
import LiveChatWidgetHeader from './LiveChatWidgetHeader';
import Sound from '../Sound';
import { VIEW } from '../../enum/livechat';

import LogoWhiteSVG from '../../media/icons/logo-white.svg';
import { LiveChatContainer, LiveChatWidget, LiveChatPluginButton } from './styled';
import { color } from '../../enum/theme';
import { get } from 'lodash';
// import LoadingSpintWrap from '../common/Loading/spining';

const originalTitle = document.title;
let intervalId = 0;

const LiveChat: React.FC = () => {
  const dispatch = useDispatch();
  const livechatWidgetRef = useRef<HTMLDivElement>(null);

  const groups = useSelector(GroupSelector.selectDataList);
  const position = useSelector(GeneralSelector.selectPosition);
  const view = useSelector(GeneralSelector.selectView);
  const showPopup = useSelector(GeneralSelector.selectShowPopup);
  const notificationCount = useSelector(GeneralSelector.selectShowNotification);
  const incomingMessage = useSelector(GeneralSelector.selectIncomingMessage);
  const isRead = useSelector(GeneralSelector.selectIsRead);

  const isGroupLoaded = useSelector(GroupSelector.selectGroupLoaded);
  const setShowPopup = useCallback(() => dispatch(GeneralAction.setShowPopup(!showPopup)), [dispatch, showPopup]);

  const setRead = useCallback(() => {
    if (notificationCount) dispatch(GeneralAction.setIsRead(true));
  }, [dispatch, notificationCount]);

  const setUnRead = useCallback(() => {
    if (!notificationCount && isRead) dispatch(GeneralAction.setIsRead(false));
  }, [dispatch, notificationCount, isRead]);

  const handleFocusLivechatWidget = useCallback(
    (e: Event) => {
      if (livechatWidgetRef.current?.contains(e.target as Node | null)) {
        setRead();
      } else {
        setUnRead();
      }
    },
    [livechatWidgetRef.current, notificationCount, isRead],
  );

  useEffect(() => {
    if (notificationCount > 0) {
      window.clearInterval(intervalId);
      intervalId = window.setInterval(() => {
        if (document.title !== originalTitle) {
          document.title = originalTitle;
        } else {
          document.title = `(${notificationCount}) The agent has replied`;
        }
      }, 1000);
    } else {
      window.clearInterval(intervalId);
      document.title = originalTitle;
    }
  }, [notificationCount]);

  useEffect(() => {
    window.addEventListener('blur', setUnRead);
    document.addEventListener('click', handleFocusLivechatWidget);

    return () => {
      window.removeEventListener('blur', setUnRead);
      document.removeEventListener('click', handleFocusLivechatWidget);
    };
  }, [notificationCount, isRead]);
  const primaryColor = useMemo(() => get(groups[0], 'liveChat_theme_color') || color.primary, [color.primary]);
  const logoSrc = useMemo(() => get(groups[0], 'liveChat_logo'), [groups[0]]);
  return (
    <LiveChatContainer position={position}>
      {isGroupLoaded && (
        <Fragment>
          <Sound
            src='https://www.mobilesringtones.com/static/p/ringtones/2018/02/01/16403/16403.mp3?title=16403_download_iphone_note_sms_ringtone_iphone_sms_ringtones.mp3'
            isPlay={incomingMessage}
          />

          {showPopup && (
            <LiveChatWidget
              ref={livechatWidgetRef}
              showPopup={showPopup}
              position={position}
              autoHeight={view === VIEW.GROUP_SETTINGS}>
              <Fragment>
                <LiveChatWidgetHeader />
                <LiveChatWidgetBody />
                <LiveChatWidgetFooter />
              </Fragment>
            </LiveChatWidget>
          )}

          <LiveChatPluginButton primaryColor={primaryColor} onClick={setShowPopup}>
            <img src={logoSrc || LogoWhiteSVG} alt='logo' />
            {Boolean(notificationCount) && !isRead && <ExclamationCircleFilled className='live-chat-notification' />}
          </LiveChatPluginButton>
        </Fragment>
      )}
    </LiveChatContainer>
  );
};

export default LiveChat;
