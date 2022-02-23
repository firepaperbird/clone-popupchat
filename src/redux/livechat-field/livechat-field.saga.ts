import { ActionTypes } from './../types';
import { put, call, takeLatest, delay, select, fork } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash';

import LiveChatAction from './livechat-field.action';
import ContactAction from '../contact/contact.action';
import ConversationAction from '../conversation/conversation.action';
import { startConnectVoiceWithCurrentUser } from '../voice/voice.saga';
import GroupSelector from '../group/group.selector';
import { ContacConversationPayload } from '../contact/types';
import CONFIG from '../../config';
import MessageAction from '../message/message.action';
import { parseStringToObject } from '../../utils';

export function* checkRequiredFields(action: ActionTypes) {
  const { payload, callback } = action;
  const { liveChatFields, fingerprint } = payload;

  try {
    const group = yield select(GroupSelector.selectDataList);
    const { id: groupId, _user } = group[0];
    let ip = '';

    try {
      const geoIp = yield call(axios.get, 'https://www.cloudflare.com/cdn-cgi/trace'); // http://www.geoplugin.net/json.gp
      const data = parseStringToObject(get(geoIp, 'data'));
      ip = get(data, 'ip');
    } catch (e) {
      console.error(e);
    }

    // Call API
    const response: AxiosResponse<ContacConversationPayload> = yield call(
      axios.post,
      `${CONFIG.CHATCHILLA_BACKEND_URL}/livechat/check_required_fields`,
      {
        liveChatFields,
        _user,
        fingerprint,
        ipAddress: ip,
        groupId,
      },
    );
    if (response.data) {
      const { contact, conversation } = response.data;

      yield delay(500); // Temporary
      yield fork(startConnectVoiceWithCurrentUser, contact);
      yield put(LiveChatAction.checkRequiredFieldsSuccess());
      yield put(ConversationAction.fetchConversationByIdSuccess(conversation));
      yield put(ContactAction.addContact(contact));
      // yield put(MessageAction.sendMessage(message));
      if (callback) {
        callback(null, response.data);
      }
    } else {
      throw new Error('Check required LiveChat');
    }
  } catch (error) {
    console.error(error);
    yield put(LiveChatAction.checkRequiredFieldsFailure(error));
    if (callback) {
      callback(error, null);
    }
  }
}

export function* checkFingerprint(action: ActionTypes) {
  const { payload, callback } = action;
  try {
    const group = yield select(GroupSelector.selectDataList);
    const { id: groupId, _user: owner } = group[0];
    const { fingerprint, liveChatFields, message } = payload;
    // Call API
    const geoIp = yield call(axios.get, 'https://api.ipify.org/?format=json'); //http://www.geoplugin.net/json.gp
    const ip = get(geoIp, ['data', 'ip'], '');
    const response = yield call(axios.post, `${CONFIG.CHATCHILLA_BACKEND_URL}/livechat/checkFingerprint`, {
      fingerprint,
      _user: owner,
      ipAddress: ip,
      liveChatFields,
      groupId,
    });
    if (response.data) {
      const { contact, conversation } = response.data;

      yield put(LiveChatAction.checkRequiredFieldsSuccess());
      yield put(ConversationAction.fetchConversationByIdSuccess(conversation));
      yield put(ContactAction.addContact(contact));
      yield put(MessageAction.sendMessage({ message }));
      if (callback) {
        callback(null, response.data);
      }
    } else {
      throw new Error('Check required LiveChat');
    }
  } catch (error) {
    console.error(error);
    yield put(LiveChatAction.checkRequiredFieldsFailure(error));
    if (callback) {
      callback(error, null);
    }
  }
}

function* checkNewInboundConversation(action: ActionTypes) {
  const { groupId, conversationId } = action.payload;
  try {
    const response = yield call(axios.post, `${CONFIG.CHATCHILLA_BACKEND_URL}/livechat/checkNewInboundConversation`, {
      conversationId,
      groupId,
    });
    if (response.data) {
      yield put(LiveChatAction.checkNewInboundConversationSuccess());
    } else {
      throw new Error('Check new inbound conversation failure.');
    }
  } catch (error) {
    console.error(error);
    yield put(LiveChatAction.checkNewInboundConversationFailure(error));
  }
}

export default function* liveChatFieldFlow() {
  yield takeLatest(LiveChatAction.CHECK_REQUIRED_FIELDS.START, checkRequiredFields);
  yield takeLatest(LiveChatAction.CHECK_FINGERPRINT.START, checkFingerprint);
  yield takeLatest(LiveChatAction.CHECK_NEW_INBOUND_CONVERSATIONS.START, checkNewInboundConversation);
}
