import { SessionTypes } from './../../types';
import { RootStateTypes, VoiceStateTypes } from './../types';
import { isEqual } from 'lodash';
import { createSelector } from 'reselect';

export default class VoiceSelector {
  static selectVoice = (state: RootStateTypes): VoiceStateTypes => state.voice;

  static selectIncall = createSelector([VoiceSelector.selectVoice], (voice) => voice.incall);

  static selectRegState = createSelector([VoiceSelector.selectVoice], (voice) => voice.regState);

  static selectElapsed = createSelector([VoiceSelector.selectVoice], (voice) => voice.elapsed);

  static selectVoiceData = createSelector([VoiceSelector.selectVoice], (voice) => voice.data.byId);

  static selectJoinCallBySessionId = (sessionId) =>
    createSelector([VoiceSelector.selectVoice], (voice) => {
      const session = voice.data.byId[sessionId];
      if (session) {
        return !!session.isJoinCall;
      }
      return false;
    });

  static selectVoiceDataByConversationIds = createSelector([VoiceSelector.selectVoice], (voice) => {
    const conversations: { [key: string]: SessionTypes } = {};
    Object.values(voice.data.byId).forEach((session: SessionTypes) => {
      conversations[session.sessionId] = session;
    });
    return conversations;
  });

  static selectVoiceList = createSelector([VoiceSelector.selectVoice], (voice) => Object.values(voice.data.byId));

  static selectVoiceDataByConversationId = (conversationId: string) =>
    createSelector([VoiceSelector.selectVoice], (voice) => {
      return Object.values(voice.data.byId).find((item: SessionTypes) => isEqual(item.conversationId, conversationId));
    });

  static selectVoiceState = createSelector([VoiceSelector.selectVoice], (voice) => {
    const sessions: { [key: string]: string[] } = {};
    Object.values(voice.data.byId).forEach((item: SessionTypes) => {
      item.participantList.forEach((p) => {
        const states = sessions[item.sessionId];
        sessions[item.sessionId] = states ? [...states, p.state] : [p.state];
      });
    });
    return sessions;
  });
}
