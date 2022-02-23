import { put, call, takeLatest, select, all, takeEvery } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import MessageAction from './message.action';
import CONFIG from '../../config';
import ConversationSelector from '../conversation/conversation.selector';
import { getUploadMessageRequest } from '../../utils';
import { UrlEnum } from '../../enum';
import { ActionTypes } from './../types';
import { AttachmentPayload, FileRequest, Message } from './types';
import GroupSelector from '../group/group.selector';

function* fetchMessageByConversationId(action: ActionTypes<{ conversationId?: string; createdAt?: string }>) {
  if (action.payload) {
    const { conversationId, createdAt } = action.payload;

    if (conversationId && createdAt) {
      try {
        // Call API
        const response: AxiosResponse<{ messages: Message[] }> = yield call(
          axios.get,
          `${CONFIG.CHATCHILLA_BACKEND_URL}/${UrlEnum.GET_MESSAGE_BY_CONVERSATION_URL(conversationId)}`,
          {
            params: { firstMessageDate: createdAt },
          },
        );
        if (response.data) {
          yield put(MessageAction.fetchMessageByConversationIdSuccess(response.data.messages));
        } else {
          throw new Error('Cannot fetch messages.');
        }
      } catch (error) {
        console.error(error);
        yield put(MessageAction.fetchMessageByConversationIdFailure(error));
      }
    }
  }
}

function* sendMessage(action: ActionTypes) {
  if (action.payload) {
    const message = action.payload.message;
    const id = Math.floor(Math.random() * 1000).toString();
    const tempMessage = { message, id, isSending: true, createdAt: new Date().toISOString() };

    try {
      yield put(MessageAction.sendMessageSuccess(tempMessage));
      const group = yield select(GroupSelector.selectDataList);
      const conversations = yield select(ConversationSelector.selectDataList);
      const conversationId = conversations[0].id;

      // Call API
      const response = yield call(axios.post, `${CONFIG.CHATCHILLA_BACKEND_URL}/livechat/message`, {
        conversationId,
        message,
        groupId: group[0]?.id,
      });
      if (response.data) {
        yield put(MessageAction.removeMessage(id));
        yield put(MessageAction.sendMessageSuccess(response.data));
      } else {
        throw new Error('Cannot send message!');
      }
    } catch (error) {
      // yield put(MessageAction.removeMessage(id));
      yield put(MessageAction.addMessage({ ...tempMessage, isSending: false, isSendingFailed: true }));
      yield put(MessageAction.sendMessageFailure(error));
      if (error.response?.status === 406 && action.callback) {
        action.callback(error.response.data, id);
      }
    }
  }
}

function* sendAttachment(action: ActionTypes<AttachmentPayload>) {
  if (action.payload) {
    const id = Math.floor(Math.random() * 1000).toString();
    const { file } = action.payload;
    const uploadMessageRequest: FileRequest = yield call(getUploadMessageRequest, file);

    const tempMessage = { file: uploadMessageRequest, id, isSending: true };

    try {
      yield put(MessageAction.addMessage(tempMessage));

      const conversations = yield select(ConversationSelector.selectDataList);
      const conversationId = conversations[0].id;
      const requestBody = { conversation: conversationId, file: uploadMessageRequest };

      const response = yield call(
        axios.post,
        `${CONFIG.CHATCHILLA_BACKEND_URL}/${UrlEnum.ATTACHMENT_URL}`,

        requestBody,
      );

      if (response.data) {
        yield put(MessageAction.sendAttachmentSuccess());
        yield put(MessageAction.removeMessage(id));
        yield put(MessageAction.addMessage(response.data));
      }
    } catch (err) {
      console.error(err);
      yield put(MessageAction.removeMessage(id));
      yield put(MessageAction.addMessage({ ...tempMessage, isSendingFailed: true }));
      yield put(MessageAction.sendAttachmentFailure(err));
    }
  }
}

export default function* messageFlow() {
  yield all([
    yield takeLatest(MessageAction.FETCH_MESSAGE_BY_CONVERSATION_ID.START, fetchMessageByConversationId),
    yield takeEvery(MessageAction.SEND_MESSAGE.START, sendMessage),
    yield takeEvery(MessageAction.SEND_ATTACHMENT.START, sendAttachment),
  ]);
}
