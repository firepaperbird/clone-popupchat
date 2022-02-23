import { includes, compact, isEqual, uniq } from 'lodash';

import VoiceAction from './voice.action';
import { CALL_STATUS } from '../../enum/voice';
import { ActionTypes, VoiceStateTypes } from './../types';

const { VoiceActionTypes } = VoiceAction;

const INITIAL_STATE = {
  regState: '',
  incall: false,
  elapsed: 0,
  error: null,
  data: {
    byId: {},
    allIds: [],
  },
};

const voiceReducer = (state: VoiceStateTypes = INITIAL_STATE, action: ActionTypes): VoiceStateTypes => {
  switch (action.type) {
    case VoiceActionTypes.JOIN_CALL: {
      const { sessionId, isJoinCall } = action.payload;
      const session = state.data.byId[sessionId];
      const byId = { ...state.data.byId, [sessionId]: { ...session, isJoinCall } };
      const allIds = Object.keys(byId);

      return {
        ...state,
        data: { byId, allIds },
      };
    }

    case VoiceActionTypes.UPDATE_VOICE_DATA: {
      const voiceData = action.payload;
      let { allIds } = state.data;
      let { byId } = state.data;

      if (Array.isArray(voiceData)) {
        voiceData.forEach((data) => {
          byId = {
            ...byId,
            [data.sessionId]: data,
          };
          allIds = uniq(compact([...allIds, data.sessionId]));
        });
      } else {
        const oldSession = state.data.byId[voiceData.sessionId];

        byId = {
          ...state.data.byId,
          [voiceData.sessionId]: oldSession ? { ...oldSession, ...voiceData } : voiceData,
        };
        allIds = uniq(compact([...state.data.allIds, voiceData.sessionId]));
      }

      return { ...state, data: { byId, allIds } };
    }

    case VoiceActionTypes.REMOVE_CLOSED_SESSION: {
      const voices = Object.values(state.data.byId);
      const byId = {};

      for (const session of voices) {
        // const isSessionHungUp = isEqual(session.eventName, 'HUNGUP');
        const isAllHungUp = session.participantList.every((participant) =>
          isEqual(participant.state, CALL_STATUS.HUNGUP),
        );
        if (!isAllHungUp) {
          byId[session.sessionId] = session;
        }
      }
      const allIds = Object.keys(byId);
      return { ...state, data: { byId, allIds } };
    }

    case VoiceActionTypes.DIALER_STATUS: {
      const incall = includes(['TALKING', 'RINGING'], action.payload);
      return {
        ...state,
        incall: incall || state.incall,
      };
    }

    case VoiceActionTypes.TALKING: {
      return {
        ...state,
        incall: true,
      };
    }

    case VoiceActionTypes.REGISTERED: {
      return {
        ...state,
        regState: action.payload,
      };
    }

    case VoiceActionTypes.DIALING_STATE: {
      return {
        ...state,
        incall: true,
      };
    }

    case VoiceActionTypes.HANGUP: {
      return {
        ...state,
        incall: false,
      };
    }

    case VoiceActionTypes.INC_CALLTIMER: {
      return {
        ...state,
        elapsed: (state.elapsed ? state.elapsed : 1) + 1,
      };
    }

    case VoiceActionTypes.RESET_CALLTIMER: {
      return {
        ...state,
        elapsed: 0,
      };
    }
    default:
      return state;
  }
};

export default voiceReducer;
