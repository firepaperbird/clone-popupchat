import SIP from 'sip.js';
import { takeLatest, call, put, select } from 'redux-saga/effects';

import VoiceAction from './voice.action';
import VoiceService from '../../services/voice';
import VoiceSelector from './voice.selector';
import { VoicePayload } from './types';
import { ContactPayload } from '../contact/types';
import { ActionTypes } from './../types';

const { VoiceActionTypes } = VoiceAction;

const wsServers = process.env.REACT_APP_VOICE_SERVER;
const voiceDomain = process.env.REACT_APP_VOICE_DOMAIN;

export function* startConnectVoiceWithCurrentUser(currentUser: ContactPayload) {
  const config = {
    userAgentString: `livechat contact`,
    traceSip: true,
    register: true,
    uri: `${currentUser.id}@${voiceDomain}`,
    password: currentUser.webrtc_password,
    rel100: SIP.C.supported.SUPPORTED,
    wsServers,
  };
  yield put(VoiceAction.apConnect(config));
}

function* handleConnected(action: ActionTypes) {
  const { payload: status } = action;

  if (status === 'CONNECTED') {
    yield put(VoiceAction.apRegister());
  }
}

// local connect
function* connect(action: ActionTypes) {
  const { payload } = action;

  try {
    yield call(VoiceService.doConnect, payload);
  } catch (error) {
    console.error(error);
  }
}

function* register() {
  try {
    yield call(VoiceService.doRegister);
  } catch (error) {
    console.log({ doRegister: 'doRegister', error });
  }
}

function* unregister() {
  try {
    yield call(VoiceService.doUnRegister);
  } catch (error) {
    console.log({ error });
    // callback(error, null);
  }
}

function* dialing(action: ActionTypes<VoicePayload>) {
  if (action.payload) {
    const { uri, options, type } = action.payload;

    try {
      yield call(VoiceService.doCall, uri, options);
      yield put(VoiceAction.appDailingState(type));
    } catch (error) {
      console.error({ error });
    }
  }
}

// ============ SESSION ============
function* hangup(action: ActionTypes) {
  const { sessionId } = action.payload;
  try {
    yield put(VoiceAction.resetCalltimer());
    yield call(VoiceService.endCall, sessionId);
    yield put(VoiceAction.apDialerStatus('CONNECTED'));
  } catch (error) {
    console.log({ error });
  }
}

function* handleAcceptCall(action: ActionTypes) {
  const { sessionId } = action.payload;
  try {
    if (sessionId) {
      yield call(VoiceService.acceptCall, sessionId);
    } else {
      throw new Error('You are on another call.');
    }
  } catch (error) {
    console.log(error);
  }
}

function* mute(action: ActionTypes) {
  const { sessionId } = action.payload;
  try {
    yield call(VoiceService.muteCall, sessionId);
  } catch (error) {
    console.log({ error });
  }
}

function* unmute(action: ActionTypes) {
  const { sessionId } = action.payload;

  try {
    yield call(VoiceService.unmuteCall, sessionId);
  } catch (error) {
    console.log({ error });
  }
}

function* cancel(action: ActionTypes) {
  const { sessionId } = action.payload;

  try {
    yield call(VoiceService.cancelCall, sessionId);
  } catch (error) {
    console.log({ error });
  }
}

function* fetchLogs(action: ActionTypes) {
  try {
    const { userId } = action.payload;
    const jsonLogs = yield call(VoiceService.fetchLogs, userId);
    const logList = jsonLogs.data.logs;

    yield put(VoiceAction.updateVoiceData(logList));
  } catch (error) {
    yield put(VoiceAction.fetchLogsFailure(error.message));
    console.error(error);
  }
}

function* handleSetSession() {
  try {
    const voices = yield select(VoiceSelector.selectVoiceList);
    for (const session of voices) {
      const { participantList, sessionId, parentCallId } = session;
      yield call(VoiceService.setSession, parentCallId, sessionId);
      for (const participant of participantList) {
        yield call(VoiceService.setSession, participant.callId, sessionId);
      }
    }
  } catch (error) {
    yield put(VoiceAction.fetchLogsFailure(error.message));
    console.error(error);
  }
}

export default function* voiceFlow() {
  yield takeLatest(VoiceActionTypes.CONNECT, connect);
  yield takeLatest(VoiceActionTypes.REGISTER, register);
  yield takeLatest(VoiceActionTypes.DIALING, dialing);
  yield takeLatest(VoiceActionTypes.HANGUP, hangup);
  yield takeLatest(VoiceActionTypes.DIALER_STATUS, handleConnected);
  yield takeLatest(VoiceActionTypes.ACCEPT_CALL, handleAcceptCall);
  yield takeLatest(VoiceActionTypes.MUTE, mute);
  yield takeLatest(VoiceActionTypes.UNMUTE, unmute);
  yield takeLatest(VoiceActionTypes.CANCEL, cancel);
  yield takeLatest(VoiceActionTypes.FETCH_LOGS, fetchLogs);
  yield takeLatest(VoiceActionTypes.SET_SESSION, handleSetSession);
}
