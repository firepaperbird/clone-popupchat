import { POSITION } from '../enum/livechat';

export interface ActionTypes<T = any> {
  type: string;
  payload?: T;
  callback?: (error: Error | null, data: any) => void;
}

export interface GeneralStateTypes {
  position: POSITION;
  showPopup: boolean;
  view: string;
  showNotification: number;
  incomingMessage: boolean;
  isRead: boolean;
}

export interface SocketStateTypes {
  rooms: string[];
  connected: boolean;
}

export interface NormalizedDataTypes {
  byId: { [key: string]: any };
  allIds: string[];
}

export interface LiveChatFieldStateTypes {
  data: NormalizedDataTypes;
  isFetching: boolean;
  error: unknown;
  loading: boolean;
  liveChatFields: any[];
}

export interface FieldStateTypes {
  data: NormalizedDataTypes;
  isFetching: boolean;
  error: unknown;
}

export interface UserStateTypes {
  data: NormalizedDataTypes;
  isFetching: boolean;
  error: unknown;
}

export interface GroupStateTypes {
  data: NormalizedDataTypes;
  isFetching: boolean;
  error: unknown;
}

export interface ContactStateTypes {
  data: NormalizedDataTypes;
  isFetching: boolean;
  error: unknown;
}

export interface ConversationStateTypes {
  data: NormalizedDataTypes;
  isFetching: boolean;
  isTyping: boolean;
  isClosedByAgent: boolean;
  isClosedByUser: boolean;
  error: unknown;
}

export interface MessageStateTypes {
  data: NormalizedDataTypes;
  isFetching: boolean;
  isSending: boolean;
  isSendingAttachment: boolean;
  error: unknown;
}

export interface VoiceStateTypes {
  data: NormalizedDataTypes;
  elapsed: number;
  incall: boolean;
  regState: string;
}

export interface RootStateTypes {
  general: GeneralStateTypes;
  socket: SocketStateTypes;
  livechatFields: LiveChatFieldStateTypes;
  fields: FieldStateTypes;
  voice: VoiceStateTypes;
  group: GroupStateTypes;
  message: MessageStateTypes;
  conversation: ConversationStateTypes;
  contact: ContactStateTypes;
  user: UserStateTypes;
  _persist?: {
    version: number;
    rehydrated: boolean;
  };
}
