import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LiveChat from './components/LiveChat/LiveChat';
import { GlobalStyles } from './components/LiveChat/styled';
import GeneralAction from './redux/general/general.action';
import GroupAction from './redux/group/group.action';
import SocketAction from './redux/socket/socket.action';
import { ROOM_NAME } from './services/socket';
import { AppParam } from './types';
import './antd-namespaced.min.css';
import LiveChatPreview from './components/LiveChat/LiveChat.preview';
import { POSITION } from './enum/livechat';
import { color } from './enum/theme';
import GroupSelector from './redux/group/group.selector';
import { get } from 'lodash';
import MessageAction from './redux/message/message.action';

const App: React.FC<AppParam> = (props) => {
  const { position, groupId, isPreview } = props;
  const dispatch = useDispatch();
  const [groupPreviewMerged, setGroupPreviewMerged] = useState(false);
  const groups = useSelector(GroupSelector.selectDataList);

  useEffect(() => {
    console.info(`[live-chat-${process.env.NODE_ENV}]`, 'Start successfully chatchilla with parameters: ', props);

    if (isPreview) dispatch(GeneralAction.setPosition(POSITION.PREVIEW));
    else if (position) dispatch(GeneralAction.setPosition(position));
    if (groupId) {
      dispatch(GroupAction.fetchGroupById(groupId));
      dispatch(SocketAction.joinRoom(ROOM_NAME.GROUP({ groupId })));
      // dispatch(SocketAction.receiveSocketEvent());
    }
  }, []);

  useEffect(() => {
    if (window.themeColor && isPreview) {
      color.primary = window.themeColor;
      color.primary2 = window.themeColor;
    } else if (groups[0]) {
      const _color = get(groups[0], 'liveChat_theme_color');
      if (_color) {
        color.primary = _color;
        color.primary2 = _color;
      }
    }
    const introMessage = get(groups[0], 'liveChat_auto_intro_message');
    if (introMessage) {
      dispatch(
        MessageAction.setIntroMessage({
          id: 'intro',
          type: 'INTRO',
          message: introMessage,
          created_by_workflow: true,
          createdAt: get(groups[0], 'createdAt'),
        }),
      );
    } else dispatch(MessageAction.removeMessage('intro'));
  }, [window.themeColor, groups[0]]);

  useEffect(() => {
    if (groups[0] && window.previewData && !groupPreviewMerged) {
      setGroupPreviewMerged(true);
      dispatch(GroupAction.fetchGroupByIdSuccess({ ...groups[0], ...window.previewData }));
    }
  }, [groups[0], window.previewData, groupPreviewMerged]);
  return <Fragment>{groups[0] ? isPreview ? <LiveChatPreview /> : <LiveChat /> : null}</Fragment>;
};

export default App;
