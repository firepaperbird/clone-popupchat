import React, { Fragment, useMemo, useRef } from 'react';

import LiveChatWidgetBody from './LiveChatWidgetBody';
import LiveChatWidgetFooter from './LiveChatWidgetFooter';
import LiveChatWidgetHeader from './LiveChatWidgetHeader';
import { POSITION } from '../../enum/livechat';

import { LiveChatWidgetBodyWrapper, PreviewLiveChatWidget } from './styled';
import LiveChatGroupSettingForm from './LiveChatGroupSettingForm';
import LiveChatWidgetContents from './LiveChatWidgetContents';
import LiveChatWidgetInput from './LiveChatWidgetInput';
// import LoadingSpintWrap from '../common/Loading/spining';

const LiveChatPreview: React.FC = () => {
  const livechatWidgetRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column' }}
      onClickCapture={function (e) {
        e.stopPropagation();
      }}>
      <PreviewLiveChatWidget ref={livechatWidgetRef} showPopup={true} position={POSITION.PREVIEW} autoHeight={false}>
        <Fragment>
          <LiveChatWidgetHeader />
          <LiveChatWidgetBodyWrapper>
            <LiveChatGroupSettingForm />
          </LiveChatWidgetBodyWrapper>
          <LiveChatWidgetFooter />
        </Fragment>
      </PreviewLiveChatWidget>
      <div id='preview-space' style={{ height: 20 }} />
      <PreviewLiveChatWidget ref={livechatWidgetRef} showPopup={true} position={POSITION.PREVIEW} autoHeight={false}>
        <Fragment>
          <LiveChatWidgetHeader />
          <LiveChatWidgetBodyWrapper>
            <LiveChatWidgetContents />
            <LiveChatWidgetInput />
          </LiveChatWidgetBodyWrapper>
          <LiveChatWidgetFooter />
        </Fragment>
      </PreviewLiveChatWidget>
    </div>
  );
};

export default LiveChatPreview;
