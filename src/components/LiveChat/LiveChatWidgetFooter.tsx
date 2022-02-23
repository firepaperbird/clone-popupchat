import React from 'react';
import { LiveChatWidgetFooterWrapper } from './styled';
import LogoSVG from '../../media/icons/logo.svg';
import { useSelector } from 'react-redux';
import GeneralSelector from '../../redux/general/general.selector';
// import style from './LiveChat.module.scss';

const LiveChatWidgetFooter = () => {
  const position = useSelector(GeneralSelector.selectPosition);

  return (
    <LiveChatWidgetFooterWrapper position={position}>
      <img src={LogoSVG} alt='' />
      Powered by Chatchilla
    </LiveChatWidgetFooterWrapper>
  );
};

export default LiveChatWidgetFooter;
