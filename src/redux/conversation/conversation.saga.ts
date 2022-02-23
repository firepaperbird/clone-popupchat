import { ActionTypes } from './../types';
import { put, call, takeLatest, select, all } from 'redux-saga/effects';
import axios from 'axios';

import ConversationAction from './conversation.action';
import ConversationSelector from './conversation.selector';
import CONFIG from '../../config';
import { UrlEnum } from '../../enum';

export function* fetchConversationById(action: ActionTypes) {
  const { payload: conversationId } = action;

  try {
    // Call API
    const response = yield call(axios.get, `${CONFIG.CHATCHILLA_BACKEND_URL}/livechat/conversation/${conversationId}`);

    if (response.data) {
      yield put(ConversationAction.fetchConversationByIdSuccess(response.data));
    } else {
      throw new Error('Cannot fetch conversation by id.');
    }
  } catch (error) {
    console.error(error);
    yield put(ConversationAction.fetchConversationByIdFailure(error));
  }
}

function* closeConversation(action: ActionTypes<{ groupId: string }>) {
  try {
    const conversations = yield select(ConversationSelector.selectDataList);
    const conversation = conversations[0];
    const groupId = action.payload?.groupId;

    const response = yield call(
      axios.put,
      `${CONFIG.CHATCHILLA_BACKEND_URL}/${UrlEnum.UPDATE_CONVERSATION_URL(conversation.id)}`,
      {
        is_close: true,
        groupId,
      },
    );

    if (response.data?.message) {
      yield put(ConversationAction.closeConversationSuccess());
    }
  } catch (error) {
    console.error(error);
    yield put(ConversationAction.closeConversationFailure(error));
  }
}

export default function* conversationFlow() {
  yield all([
    yield takeLatest(ConversationAction.FETCH_CONVERSATION_BY_ID.START, fetchConversationById),
    yield takeLatest(ConversationAction.CLOSE_CONVERSATION.START, closeConversation),
  ]);
}
