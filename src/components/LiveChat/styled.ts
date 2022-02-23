import { color } from './../../enum/theme';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

import { POSITION, positionToStyle } from './../../enum/livechat';
import {
  LiveChatMessageProps,
  LiveChatWidgetProps,
  LiveChatContainerProps,
  LiveChatWidgetHeaderWrapperProps,
} from '../../types';

export const GlobalStyles = createGlobalStyle`
  /* body {
    height: unset;
    width: unset;
  } */
`;

export const LiveChatContainer = styled.span<LiveChatContainerProps>`
  position: fixed;
  z-index: 1;

  ${({ position }) => {
    if (position === POSITION.TOP_LEFT) {
      return `
        top: 10px;
        left: 10px;
      `;
    }
    if (position === POSITION.TOP_RIGHT) {
      return `
        top: 10px;
        right: 10px;
      `;
    }
    if (position === POSITION.BOTTOM_LEFT) {
      return `
        bottom: 10px;
        left: 10px;
      `;
    }
    return `
      bottom: 10px;
      right: 10px;
    `;
  }}

  ${({ top }) => top && `top: ${top};`}}
  ${({ left }) => left && `left: ${left};`}}
  ${({ right }) => right && `right: ${right};`}}
  ${({ bottom }) => bottom && `bottom: ${bottom};`}}
`;

export const LiveChatPluginButton = styled.button<any>`
  border: 0;
  background-color: ${(props) => props.primaryColor};
  background: ${(props) => props.primaryColor};
  border-radius: 100%;
  padding: 15px;
  cursor: pointer;
  box-shadow: 3px 3px 10px -5px grey;
  position: relative;
  &:focus {
    background-color: ${(props) => props.primaryColor};
    background: ${(props) => props.primaryColor};
  }
  img {
    height: 50px;
    width: 50px;
  }

  .live-chat-notification {
    position: absolute;
    color: #ea4141;
    top: -3px;
    right: -5px;
    font-size: 20px;
  }
`;

const bounceInAnimation = (position = 'bottom right') => keyframes`
  0% {
    opacity: 0;
    transform: scale(0, 0);
    transform-origin: ${position};
  }

  50% {
    transform: scale(1.03, 1.03);
    transform-origin: ${position};
  }

  100% {
    opacity: 1;
    transform: scale(1, 1);
    transform-origin: ${position};
  }
`;

const bounceOutAnimation = (position = 'bottom right') => keyframes`
  0% {
    opacity: 1;
    transform: scale(1, 1);
    transform-origin: ${position};
  }

  100% {
    opacity: 0;
    transform: scale(0, 0);
    transform-origin: ${position};
  }
`;

export const LiveChatWidget = styled.div<LiveChatWidgetProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  width: 450px;
  height: 500px;
  max-height: 500px;
  box-shadow: 3px 3px 10px 1px #a7a7a7;
  position: absolute;
  border-radius: 15px;
  /* visibility: hidden; */
  opacity: 0;
  animation: ${({ showPopup, position = POSITION.BOTTOM_RIGHT }) =>
    showPopup ? bounceInAnimation(positionToStyle[position]) : bounceOutAnimation(positionToStyle[position])} ${({
  showPopup,
}) => (showPopup ? '0.5s' : '0.2s')} ease-in-out;
  animation-fill-mode: forwards;

  ${({ autoHeight }) => autoHeight && ` height: 400px;`}

  ${({ top }) => top && `top: ${top};`}}
  ${({ left }) => left && `left: ${left};`}}
  ${({ right }) => right && `right: ${right};`}}
  ${({ bottom }) => bottom && `bottom: ${bottom};`}}
  ${({ position }) => {
    if (position === POSITION.TOP_LEFT) {
      return `
        top: 70px;
        left: -15px;
        border-radius: 5px 15px 15px 15px;
      `;
    }
    if (position === POSITION.TOP_RIGHT) {
      return `
        top: 70px;
        right: -15px;
        border-radius: 15px 5px 15px 15px;
      `;
    }
    if (position === POSITION.BOTTOM_LEFT) {
      return `
        bottom: 70px;
        left: -15px;
        border-radius: 15px 15px 15px 5px;
      `;
    }
    if (position === POSITION.BOTTOM_RIGHT) {
      return `
      bottom: 70px;
      right: -15px;
      border-radius: 15px 15px 5px 15px;
    `;
      // PREVIEW
      return `border-radius: 15px 15px 15px 15px;`;
    }
  }}
`;

export const LiveChatWidgetHeaderWrapper = styled.div<LiveChatWidgetHeaderWrapperProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; // calc(100% - 20px);
  height: 75px;
  background: ${(props) => props.primaryColor};
  background-image: linear-gradient(to right, ${(props) => props.primaryColor}, ${(props) => props.primaryColor2});
  padding: 10px;
  position: relative;

  ${({ position }) => {
    if (position === POSITION.TOP_LEFT) {
      return 'border-radius: 5px 15px 0 0;';
    }
    if (position === POSITION.TOP_RIGHT) {
      return 'border-radius: 15px 5px 0 0;';
    }
    return 'border-radius: 15px 15px 0 0;';
  }};
`;

export const LiveChatHeadTitle = styled.div<any>`
  display: flex;
  justify-content: center;
  color: ${(props) => props.textColor || color.light};
  font-size: 16pt;
  font-weight: 600;
  margin-left: 10px;
`;

export const LiveChatHeadAction = styled.div<any>`
  font-size: inherit;
  & button,
  .ant-btn {
    background-color: transparent;
    border: 0;
    margin: 0 5px;
    border-radius: 100%;
    padding: 5px;
    height: 40px;
    width: 40px;
    color: ${(props) => props.textColor || color.light};
    font-weight: 600;
    font-size: 20px;
    cursor: pointer;
  }

  button,
  .ant-btn {
    &:hover,
    &:focus {
      background-color: transparent;
      color: #fff;
    }
  }
`;

export const LiveChatWidgetBodyWrapper = styled.div<any>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 80%;
  opacity: 1;
  background-color: ${color.light};
`;

export const LiveChatContentWrapper = styled.div`
  padding: 5px 0;
  height: 85%;
  width: 100%;
  overflow: auto;
`;

export const LiveChatGroupSettingFormWrapper = styled.div<any>`
  padding: 20px;
  margin: 10px;
  width: 100%;
  height: 100%;
  overflow: auto;

  form {
    height: 100%;
    position: relative;
  }

  button[type='submit'] {
    border-radius: 5px;
    background-color: ${(props) => props.primaryColor};
    color: ${(props) => props.textColor || color.light};
    border: 0;
  }
`;

export const LiveChatInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${color.borderColorLight};
  height: 55px;
  width: 100%;

  textarea {
    width: 80%;
    border: 0;
    padding-left: 10px;
    resize: none;
  }
`;

export const LiveChatWidgetFooterWrapper = styled.div<{ position: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${color.borderColorLight};
  height: 25px;
  width: 100%;
  font-size: 9pt;
  background-color: ${color.light};
  img {
    height: 15px;
    width: 15px;
    margin-right: 5px;
  }

  ${({ position }) => {
    if (position === POSITION.BOTTOM_LEFT) {
      return `border-radius: 0 0 15px 5px;`;
    }
    if (position === POSITION.BOTTOM_RIGHT) {
      return `border-radius: 0 0 5px 15px;`;
    }
    return `border-radius: 0 0 15px 15px;`;
  }}
`;

export const LiveChatMessageWrapper = styled.div<LiveChatMessageProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-right: 20px;
  position: relative;

  ${({ outgoingMessage }) =>
    outgoingMessage &&
    `
    align-items: flex-start;
    margin-left: 10px;
  `}
`;

export const LiveChatAttachmentWrapper = styled.div<LiveChatMessageProps>`
  color: black;
  img {
    /* height: 150px; */
    width: 150px;
    border-radius: 10px;
    box-shadow: 1px 1px 10px -6px grey;
    /* object-fit: cover; */
  }
`;

export const LiveChatMessageInfo = styled.div`
  font-weight: 400;
  font-size: 12px;
  margin: 0 5px;
  font-style: italic;
`;

export const LiveChatMessageContent = styled.div<LiveChatMessageProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  padding: 5px 10px;
  margin-bottom: 5px;
  background-color: ${(props) => props.pcolor};
  color: ${color.light};

  a {
    color: ${color.light};
  }

  span {
    font-weight: 600;
    margin-right: 5px;
    &:hover {
      cursor: pointer;
    }
  }

  ${({ attachment, outgoingMessage }) => {
    if (attachment) {
      return outgoingMessage
        ? `
        border-radius: 3px 15px 15px 3px;
        a {
          color: ${color.dark};
        }
      `
        : `border-radius: 15px 3px 3px 15px;`;
    }
  }}

  ${({ outgoingMessage }) =>
    outgoingMessage &&
    `
    background-color:  ${color.secondary};
    color: ${color.dark};
  `}
`;

export const LiveChatSkeleton = styled.div<LiveChatMessageProps>`
  width: 60%;
  height: 100%;

  ${({ outgoingMessage }) =>
    outgoingMessage &&
    `
    margin-left: auto;
    transform: rotateY(180deg);`};
`;

export const LiveChatMessageAction = styled.div<LiveChatMessageProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  position: relative;

  .emoji-mart {
    position: absolute;
    right: 95px;
    bottom: 50px;
  }

  .attachmentSpinner {
    color: #fff;

    .loadingIcon {
      font-size: 14px;
    }
  }

  button.dropDownButton,
  button.submit {
    border: 0;
    background-color: ${(props) => props.primaryColor};
    border-radius: 100%;
    color: ${(props) => props.textColor || color.light} !important;
    height: 35px;
    width: 35px;
    margin: 5px;
    cursor: pointer;
  }
`;

export const CenterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ldsCircleKeyframes = keyframes`
  0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
`;

export const LdsCircleAnimation = styled.div`
  display: inline-block;
  transform: translateZ(1px);

  * {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin: 8px;
    border-radius: 50%;
    background: #fff;
    animation: ${ldsCircleKeyframes} 5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
`;

export const LiveChatSendingStatusWrapper = styled.div`
  position: absolute;
  right: -17px;
  top: 24px;
`;

export const TypingWrapper = styled.div`
  position: absolute;
  bottom: 80px;
  left: 40%;
  padding: 2px 6px;
  border-radius: 5px 5px 0 0;
  box-shadow: 1px -1px 7px -5px grey;
  color: ${color.primary};
  font-size: 11px;
  display: flex;

  span {
    margin-right: 3px;
  }
`;

export const PreviewLiveChatWidget = styled(LiveChatWidget)`
  margin: 0px;
  position: relative;
`;

export const IntroduceWrapper = styled.div`
  text-align: center;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 20px;
`;
export const TermsWrapper = styled.div`
  text-align: center;
  width: 100%;
  margin: 10px 0px;
`;
