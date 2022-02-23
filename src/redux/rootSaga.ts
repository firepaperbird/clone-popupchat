import axios from 'axios';
import { all } from 'redux-saga/effects';
import { take } from 'lodash';
import qs from 'qs';

import liveChatFieldFlow from './livechat-field/livechat-field.saga';
import socketFlow from './socket/socket.saga';
import fieldFlow from './field/field.saga';
import voiceFlow from './voice/voice.saga';
import groupFlow from './group/group.saga';
import conversationFlow from './conversation/conversation.saga';
import messageFlow from './message/message.saga';
import realtimeMessageFlow from './realtime/message.realtime';
import userFlow from './user/user.saga';
import realtimeConversationFlow from './realtime/conversation.realtime';
import generalFlow from './general/general.saga';
import GeneralAction from './general/general.action';

axios.interceptors.request.use(
  function (request) {
    request.paramsSerializer = (params) => qs.stringify(params);
    return request;
  },
  function (error) {
    Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default function* rootSaga() {
  yield take(GeneralAction.REHYDRATION_SUCCESS);

  yield all([
    liveChatFieldFlow(),
    socketFlow(),
    fieldFlow(),
    voiceFlow(),
    groupFlow(),
    conversationFlow(),
    messageFlow(),
    realtimeMessageFlow(),
    realtimeConversationFlow(),
    generalFlow(),
    userFlow(),
  ]);
}
