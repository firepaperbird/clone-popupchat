import { MESSAGE_TYPES } from './../../enum/message';
import { ActionTypes } from './../types';
import { put, select, takeEvery } from 'redux-saga/effects';
import MessageAction from '../message/message.action';
import SocketAction from '../socket/socket.action';
import UserAction from '../user/user.action';
import ConversationAction from '../conversation/conversation.action';
import UserSelector from '../user/user.selector';
import ConversationSelector from '../conversation/conversation.selector';
import { MessageEnum } from '../../enum';
import GeneralAction from '../general/general.action';
import GeneralSelector from '../general/general.selector';

function* handleReceiveMessage(action: ActionTypes) {
  const { message, conversation } = action.payload;

  const conversations = yield select(ConversationSelector.selectDataList);
  const currentConversationId = conversations[0]?.id;

  if (conversation.id === currentConversationId) {
    try {
      if (message.system_type === MessageEnum.MESSAGE_TYPES.CLOSE_CONVERSATION) {
        const isClosedByUser = yield select(ConversationSelector.selectIsClosedByUser);

        if (isClosedByUser) {
          yield put(ConversationAction.closeConversationSuccess());
        } else {
          yield put(ConversationAction.closeConversationSuccess(true));
        }
      } else {
        const isRead = yield select(GeneralSelector.selectIsRead);
        const users = yield select(UserSelector.selectDataById);
        const user = users[message._from];

        if (message.type === MESSAGE_TYPES.LIVE_CHAT) {
          if (!user && message._from) {
            yield put(UserAction.fetchUserById(message._from));
          }
          yield put(MessageAction.addMessage(message));

          // Trigger Play Sound Message
          if (message._from) {
            yield put(GeneralAction.setIncomingMessage(true));

            if (!isRead) {
              yield put(GeneralAction.setShowNotification(true));
            }
          }
        }
      }
    } catch (error) {
      yield put(MessageAction.setError(error));
    }
  }
}

export default function* realtimeMessageFlow() {
  yield takeEvery(SocketAction.SOCKET_EVENT.RECEIVE_MESSAGE, handleReceiveMessage);
}
