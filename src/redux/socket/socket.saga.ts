import { ROOM_NAME } from './../../services/socket';
import { ActionTypes } from './../types';
/* eslint-disable require-yield */
import { put, call, takeLatest, select, take, fork, delay, takeLeading, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import axios from 'axios';

import SocketService from '../../services/socket';
import SocketAction from './socket.action';
import SocketSelector from './socket.selector';

export function* socketEventChannel() {
  return eventChannel((emitter) => {
    const events = Object.values(SocketAction.SOCKET_EVENT);
    events.forEach((eventName) => {
      SocketService.on(eventName, (payload) => {
        console.log(`%c${eventName}`, 'background-color: black; padding: 10px; color: white; border-radius: 5px');
        emitter({ type: eventName, payload });
      });
    });

    return () => {};
  });
}

export function* onReceiveSocketEvent() {
  const channel = yield call(socketEventChannel);
  while (true) {
    try {
      const action = yield take(channel);
      yield put(action);
    } catch (error) {
      console.error(error);
    }
  }
}

export function* leaveAllRooms() {
  try {
    const allRooms = yield select(SocketSelector.selectRooms);

    if (Array.isArray(allRooms) && allRooms.length > 0) {
      for (const roomName of allRooms) {
        yield put(SocketAction.leaveRoom(roomName));
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export function* joinAllRooms() {
  try {
    yield call(leaveAllRooms);
    const response = yield call(axios.get, '/'); // Need fixed
    if (response.data) {
      // Do something
    } else {
      throw new Error('No socket rooms found');
    }
  } catch (error) {
    console.error(error);
  }
}

export function* joinConnectionRoom(action: ActionTypes) {
  const { payload: userId } = action;
  try {
    yield call(SocketService.joinConnectionRoom, userId);
  } catch (error) {
    console.log({ error });
  }
}

export function* leaveConnectionRoom(action: ActionTypes) {
  const { payload: userId } = action;

  try {
    yield call(SocketService.leaveConnectionRoom, userId);
  } catch (error) {
    console.log({ error });
  }
}

export function* joinRoom(action: ActionTypes) {
  const { payload: roomName } = action;
  try {
    yield call(SocketService.joinRoom, roomName);
  } catch (error) {
    console.log({ error });
  }
}

export function* leaveRoom(action: ActionTypes) {
  const { payload: roomName } = action;
  try {
    yield call(SocketService.leaveRoom, roomName);
  } catch (error) {
    console.log({ error });
  }
}

export function* disconnect() {
  try {
    yield call(SocketService.disconnect);
  } catch (error) {
    console.log({ error });
  }
}

export function* receiveSocketEvent() {
  try {
    yield fork(onReceiveSocketEvent);
  } catch (error) {
    console.log({ error });
  }
}

export function* liveChatTypingEvent(action: ActionTypes) {
  const { groupId } = action.payload;
  try {
    SocketService.emit(ROOM_NAME.GROUP({ groupId }), SocketAction.LIVECHAT_TYPING_EVENT, action.payload);
    // yield delay(1000);
  } catch (error) {
    console.log({ error });
  }
}

export default function* socketFlow() {
  yield takeLatest(SocketAction.JOIN_ROOM, joinRoom);
  yield takeLatest(SocketAction.DISCONNECT, disconnect);
  yield takeLatest(SocketAction.LEAVE_ROOM, leaveRoom);
  yield takeLatest(SocketAction.LEAVE_ALL_ROOM, leaveAllRooms);
  yield takeLatest(SocketAction.JOIN_CONNECTION_ROOM, joinConnectionRoom);
  yield takeLatest(SocketAction.LEAVE_CONNECTION_ROOM, leaveConnectionRoom);
  yield takeLatest(SocketAction.RECEIVE_SOCKET_EVENT, receiveSocketEvent);
  yield takeLatest(SocketAction.SOCKET_EVENT.JOIN_ALL_ROOMS, joinAllRooms);
  yield takeEvery(SocketAction.LIVECHAT_TYPING_EVENT, liveChatTypingEvent);
}
