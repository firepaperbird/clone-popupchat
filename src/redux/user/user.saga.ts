import { ActionTypes } from './../types';
import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import UserAction from './user.action';
import CONFIG from '../../config';

export function* fetchUserById(action: ActionTypes) {
  const { payload: userId } = action;

  try {
    // Call API
    const response = yield call(axios.get, `${CONFIG.CHATCHILLA_BACKEND_URL}/livechat/user/${userId}`);

    if (response.data) {
      yield put(UserAction.fetchUserByIdSuccess(response.data));
    } else {
      throw new Error('Cannot fetch user by id.');
    }
  } catch (error) {
    console.error(error);
    yield put(UserAction.fetchUserByIdFailure(error));
  }
}

export default function* userFlow() {
  yield takeLatest(UserAction.FETCH_USER_BY_ID.START, fetchUserById);
}
