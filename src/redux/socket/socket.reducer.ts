import { ROOM_NAME } from '../../services/socket';
import { SocketStateTypes, ActionTypes } from './../types';
import { uniq } from 'lodash';
import SocketAction from './socket.action';

const INITIAL_STATE = {
  rooms: [],
  connected: false,
};

const socketReducer = (state: SocketStateTypes = INITIAL_STATE, action: ActionTypes): SocketStateTypes => {
  switch (action.type) {
    case SocketAction.SET_IS_CONNECTED:
      return { ...state, connected: action.payload };
    case SocketAction.JOIN_CONNECTION_ROOM:
      return { ...state, rooms: uniq([...state.rooms, action.payload]) };
    case SocketAction.LEAVE_CONNECTION_ROOM:
      return { ...state, rooms: state.rooms.filter((item) => item !== ROOM_NAME.CONNECTION) };
    case SocketAction.JOIN_ROOM:
      return { ...state, rooms: uniq([...state.rooms, action.payload]) };
    case SocketAction.LEAVE_ROOM:
      return { ...state, rooms: state.rooms.filter((item) => item !== action.payload) };
    default:
      return state;
  }
};

export default socketReducer;
