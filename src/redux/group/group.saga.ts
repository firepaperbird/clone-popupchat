import { POSITION } from './../../enum/livechat';
/* eslint-disable camelcase */
import { omit } from 'lodash';
import { ActionTypes } from './../types';
import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import GroupAction from './group.action';
import CONFIG from '../../config';
import FieldAction from '../field/field.action';
import LiveChatFieldAction from '../livechat-field/livechat-field.action';
import GeneralAction from '../general/general.action';

export function* fetchGroupById(action: ActionTypes) {
  const { payload: groupId } = action;

  try {
    // Call API
    const response = yield call(axios.get, `${CONFIG.CHATCHILLA_BACKEND_URL}/livechat/group/${groupId}`);

    if (response.data) {
      const { liveChat_requiredFields, liveChat_position } = response.data;
      const group = {
        ...response.data,
        live_chat_fields: liveChat_requiredFields.map((item: any) => item.id),
      };
      yield put(GeneralAction.setPosition(liveChat_position || POSITION.BOTTOM_RIGHT));
      yield put(GroupAction.fetchGroupByIdSuccess(group));

      const fields = liveChat_requiredFields.map((item: any) => item.field);
      yield put(FieldAction.fetchFieldByIdsSuccess(fields));

      const liveChatFields = liveChat_requiredFields.map((item: any) => omit(item, 'field'));
      yield put(LiveChatFieldAction.addLiveChatField(liveChatFields));
    } else {
      throw new Error('Cannot fetch LiveChat Fields by GroupId.');
    }
  } catch (error) {
    console.error(error);
    yield put(GroupAction.fetchGroupByIdFailure(error));
  }
}

export default function* groupFlow() {
  yield takeLatest(GroupAction.FETCH_GROUP_BY_ID.START, fetchGroupById);
}
