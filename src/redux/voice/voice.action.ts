import { ActionTypes } from '../types';
import { VoicePayload } from './types';

export default class VoiceAction {
  static VoiceActionTypes = {
    CONNECT: 'Voice/CONNECT',
    REGISTER: 'Voice/REGISTER',
    CONNECTED: 'Voice/CONNECTED',
    DIALER_STATUS: 'Voice/DIALER_STATUS',
    TRYING: 'Voice/TRYING',
    RINGING: 'Voice/RINGING',
    TALKING: 'Voice/TALKING',
    REGISTERED: 'Voice/REGISTERED',
    TOGGLE_DIALPAD: 'Voice/TOGGLE_DIALPAD',
    TOGGLE_KEYPAD: 'Voice/TOGGLE_KEYPAD',
    DIALING_STATE: 'Voice/DIALING_STATE',
    DIALING: 'Voice/DAILING',
    ON_RECEIVE_MESSAGE: 'Voice/ON_RECEIVE_MESSAGE',
    ON_MESSAGE: 'Voice/ON_MESSAGE',
    ACCEPT_CALL: 'Voice/ACCEPT_CALL',
    QUICK_DIAL: 'Voice/QUICK_DIAL',
    HANGUP: 'Voice/HANGUP',
    INC_CALLTIMER: 'Voice/INC_CALLTIMER',
    RESET_CALLTIMER: 'Voice/RESET_CALLTIMER',
    MUTE: 'Voice/MUTE',
    UNMUTE: 'Voice/UNMUTE',
    CANCEL: 'Voice/CANCEL',
    UPDATE_VOICE_DATA: 'Voice/UPDATE_VOICE_DATA',
    REMOVE_CLOSED_SESSION: 'Voice/REMOVE_CLOSED_SESSION',
    JOIN_CALL: 'Voice/JOIN_CALL',
    FETCH_LOGS: 'Voice/FETCH_LOGS',
    FETCH_LOGS_SUCCESS: 'Voice/FETCH_LOGS_SUCCESS',
    FETCH_LOGS_FAILURE: 'Voice/FETCH_LOGS_FAILURE',
    SET_LATEST_SESSION_ID: 'Voice/SET_LATEST_SESSION_ID',
    SET_CURRENT_SESSION_ID: 'Voice/SET_CURRENT_SESSION_ID',
    SET_SESSION: 'Voice/SET_SESSION',
  };

  static setSession = (): ActionTypes => {
    return {
      type: VoiceAction.VoiceActionTypes.SET_SESSION,
    };
  };

  static updateVoiceData = (payload): ActionTypes => {
    return {
      type: VoiceAction.VoiceActionTypes.UPDATE_VOICE_DATA,
      payload,
    };
  };

  static setJoinCall = (sessionId: string, isJoinCall: boolean): ActionTypes => {
    return {
      type: VoiceAction.VoiceActionTypes.JOIN_CALL,
      payload: { sessionId, isJoinCall },
    };
  };

  static removeClosedSession = (): ActionTypes => {
    return {
      type: VoiceAction.VoiceActionTypes.REMOVE_CLOSED_SESSION,
    };
  };

  static apConnect = (payload: any): ActionTypes => {
    return {
      type: VoiceAction.VoiceActionTypes.CONNECT,
      payload,
    };
  };

  static apRegister = (): ActionTypes => {
    return {
      type: VoiceAction.VoiceActionTypes.REGISTER,
    };
  };

  static registered = (payload: string): ActionTypes => {
    return {
      type: VoiceAction.VoiceActionTypes.REGISTERED,
      payload,
    };
  };

  static connected = (payload: boolean): ActionTypes => {
    return {
      type: VoiceAction.VoiceActionTypes.CONNECTED,
      payload,
    };
  };

  // uri, options, dtype, mType = '', mGateway = '', mConferenceId = '', mGroupId = ''
  static apDailing = (payload: VoicePayload): ActionTypes<VoicePayload> => ({
    type: VoiceAction.VoiceActionTypes.DIALING,
    payload,
  });

  static appDailingState = (payload: string): ActionTypes => ({
    type: VoiceAction.VoiceActionTypes.DIALING_STATE,
    payload,
  });

  static hangup = (sessionId: string): ActionTypes => {
    return {
      type: VoiceAction.VoiceActionTypes.HANGUP,
      payload: { sessionId },
    };
  };

  static acceptCall = (sessionId: string): ActionTypes => {
    return {
      type: VoiceAction.VoiceActionTypes.ACCEPT_CALL,
      payload: { sessionId },
    };
  };

  static apDialerStatus = (status: string): ActionTypes => {
    return {
      type: VoiceAction.VoiceActionTypes.DIALER_STATUS,
      payload: status,
    };
  };

  static incCalltimer = (): ActionTypes => {
    return {
      type: VoiceAction.VoiceActionTypes.INC_CALLTIMER,
    };
  };

  static resetCalltimer = (): ActionTypes => {
    return {
      type: VoiceAction.VoiceActionTypes.RESET_CALLTIMER,
    };
  };

  static muteCall = (sessionId: string): ActionTypes => {
    return {
      type: VoiceAction.VoiceActionTypes.MUTE,
      payload: { sessionId },
    };
  };

  static unMuteCall = (sessionId: string): ActionTypes => {
    return {
      type: VoiceAction.VoiceActionTypes.UNMUTE,
      payload: { sessionId },
    };
  };

  static cancelCall = (sessionId: string): ActionTypes => {
    return {
      type: VoiceAction.VoiceActionTypes.CANCEL,
      payload: { sessionId },
    };
  };

  static receiveMessageFromSocketServer = (payload: string): ActionTypes => ({
    type: VoiceAction.VoiceActionTypes.ON_RECEIVE_MESSAGE,
    payload,
  });

  static fetchLogs = (payload: any): ActionTypes => ({ type: VoiceAction.VoiceActionTypes.FETCH_LOGS, payload });

  static fetchLogsFailure = (error: Error): ActionTypes => ({
    type: VoiceAction.VoiceActionTypes.FETCH_LOGS_FAILURE,
    payload: { error },
  });
}
