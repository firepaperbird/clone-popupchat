import { ActionTypes } from './../types';

export default class SocketAction {
  static JOIN_ROOM = 'Socket/JOIN_ROOM';

  static JOIN_CONNECTION_ROOM = 'Socket/JOIN_CONNECTION_ROOM';

  static LEAVE_CONNECTION_ROOM = 'Socket/LEAVE_CONNECTION_ROOM';

  static DISCONNECT = 'Socket/DISCONNECT';

  static SET_IS_CONNECTED = 'Socket/SET_IS_CONNECTED';

  static LEAVE_ALL_ROOM = 'Socket/LEAVE_ALL_ROOM';

  static LEAVE_ROOM = 'Socket/LEAVE_ROOM';

  static RECEIVE_SOCKET_EVENT = 'Socket/RECEIVE_SOCKET_EVENT';

  static SOCKET_EVENT = {
    JOIN_ALL_ROOMS: 'SocketEvent/JOIN_ALL_ROOMS',
    RECEIVE_MESSAGE: 'SocketEvent/RECEIVE_MESSAGE',
    AGENT_TYPING_EVENT: 'SocketEvent/AGENT_TYPING_EVENT',
  };

  static LIVECHAT_TYPING_EVENT = 'SocketEvent/LIVECHAT_TYPING_EVENT';

  static liveChatTypingEvent = (
    groupId: string,
    conversationId: string,
    message: string,
    isTyping: boolean,
  ): ActionTypes => ({
    type: SocketAction.LIVECHAT_TYPING_EVENT,
    payload: { groupId, conversationId, message, isTyping },
  });

  static setConnected = (connected: boolean): ActionTypes => ({
    type: SocketAction.SET_IS_CONNECTED,
    payload: connected,
  });

  static joinAllRooms = (): ActionTypes => ({
    type: SocketAction.SOCKET_EVENT.JOIN_ALL_ROOMS,
  });

  static joinRoom = (roomName: string): ActionTypes => ({
    type: SocketAction.JOIN_ROOM,
    payload: roomName,
  });

  static leaveAllRoom = (): ActionTypes => ({
    type: SocketAction.LEAVE_ALL_ROOM,
  });

  static joinConnectionRoom = (): ActionTypes => ({
    type: SocketAction.JOIN_CONNECTION_ROOM,
  });

  static leaveConnectionRoom = (): ActionTypes => ({
    type: SocketAction.LEAVE_CONNECTION_ROOM,
  });

  static leaveRoom = (roomName: string): ActionTypes => ({
    type: SocketAction.LEAVE_ROOM,
    payload: roomName,
  });

  static disconnect = (): ActionTypes => ({
    type: SocketAction.DISCONNECT,
  });

  static receiveSocketEvent = (): ActionTypes => ({
    type: SocketAction.RECEIVE_SOCKET_EVENT,
  });
}
