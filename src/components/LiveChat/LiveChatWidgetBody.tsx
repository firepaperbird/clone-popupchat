import React, { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

import LiveChatWidgetContents from './LiveChatWidgetContents';
import LiveChatWidgetInput from './LiveChatWidgetInput';
import LiveChatGroupSettingForm from './LiveChatGroupSettingForm';
import GeneralSelector from '../../redux/general/general.selector';
import LiveChatFieldSelector from '../../redux/livechat-field/livechat-field.selector';
import { VIEW } from '../../enum/livechat';
import { LiveChatWidgetBodyProps } from '../../types';

import { LiveChatWidgetBodyWrapper, LdsCircleAnimation } from './styled';
import LogoSVG from '../../media/icons/logo.svg';
// import style from './LiveChat.module.scss';

const LiveChatWidgetBody: React.FC<LiveChatWidgetBodyProps> = () => {
  const view = useSelector(GeneralSelector.selectView);
  const loading = useSelector(LiveChatFieldSelector.selectLoading);

  const children = useMemo(() => {
    if (loading) {
      return (
        <LdsCircleAnimation>
          <img src={LogoSVG} alt='' />
        </LdsCircleAnimation>
      );
    }

    if (view === VIEW.CHAT) {
      return (
        <React.Fragment>
          <LiveChatWidgetContents />
          <LiveChatWidgetInput />
        </React.Fragment>
      );
    }
    return <LiveChatGroupSettingForm />;
  }, [loading, view]);

  return <LiveChatWidgetBodyWrapper>{children}</LiveChatWidgetBodyWrapper>;
};
export default LiveChatWidgetBody;
