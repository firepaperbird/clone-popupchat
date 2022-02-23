import { ActionTypes } from './../types';
import { put, takeLatest, select } from 'redux-saga/effects';
import MessageAction from '../message/message.action';
import SocketAction from '../socket/socket.action';
import ConversationSelector from '../conversation/conversation.selector';
import ConversationAction from '../conversation/conversation.action';

function* handleAgentTyping(action: ActionTypes) {
  const { conversationId, isTyping } = action.payload;
  try {
    const conversations = yield select(ConversationSelector.selectDataList);
    const conversation = conversations[0];

    if (conversationId === conversation.id) {
      yield put(ConversationAction.setTyping(isTyping));
    }
  } catch (error) {
    yield put(MessageAction.setError(error));
  }
}

export default function* realtimeConversationFlow() {
  yield takeLatest(SocketAction.SOCKET_EVENT.AGENT_TYPING_EVENT, handleAgentTyping);
}
