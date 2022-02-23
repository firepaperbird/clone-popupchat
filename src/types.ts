import React from 'react';

import { POSITION, VIEW } from './enum/livechat';

export interface AppParam {
  groupId?: string;
  isPreview?: boolean;
  position?: POSITION;
}

export interface LiveChatMessageProps {
  outgoingMessage?: boolean;
  typing?: boolean;
  [key: string]: any;
}

export interface LiveChatMessageAttachmentProps {
  [key: string]: any;
  outgoingMessage?: boolean;
}

export interface CustomDropdownProps {
  title?: string;
}

export interface CustomDropdownItemProps {
  onClick?: () => void;
  className?: string;
}

export interface LiveChatWidgetBodyProps {}

export interface LiveChatGroupSettingFormProps {}

export interface LiveChatWidgetHeaderProps {
  title: string;
}

export interface LiveChatWidgetProps {
  autoHeight: boolean;
  showPopup: boolean;
  position?: POSITION;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export interface LiveChatContainerProps {
  position?: POSITION;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export interface LiveChatWidgetHeaderWrapperProps {
  topRight?: boolean;
  topLeft?: boolean;
  position: POSITION;
  primaryColor: string;
  primaryColor2: string;
}

export interface ParticipantTypes {
  userId: string;
  callId: string;
  state: string;
  externalNumber: string;
  pickUpTimeStamp: number;
  meta: any;
}

export interface SessionTypes {
  currentUserId: string;
  parentCallId: string;
  sessionId: string;
  eventName: string;
  conversationId: string;
  firstPickUpTimeStamp: number;
  participantList: ParticipantTypes[];
}

export interface SoundProps {
  src?: string;
  isPlay?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
}
export interface SocketIOTypes {
  socket: SocketIOClient.Socket;
  url: string;
  config: any;

  connect: () => void;
  joinRoom: (roomName: string) => void;
  leaveRoom: (roomName: string) => void;
  joinConnectionRoom: (userId: string) => void;
  leaveConnectionRoom: (userId: string) => void;
  emit: (roomName: string, eventName: string, data: any) => void;
  disconnect: () => void;
  on: (eventName: string, handler: (data: any) => void) => void;
}
