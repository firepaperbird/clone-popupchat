import { ActionTypes } from './../types';
/* eslint-disable require-yield */
import { put, call, takeLatest, select, take, fork } from 'redux-saga/effects';
import axios from 'axios';
import FieldAction from './field.action';
import CONFIG from '../../config';

export function* fetchFieldByIds(action: ActionTypes) {
  const { payload: fieldIds } = action;

  try {
    // Call API
    const response = yield call(axios.get, `${CONFIG}/field`, { params: fieldIds });
    if (response.data) {
      yield put(FieldAction.fetchFieldByIdsSuccess(response.data));
    } else {
      throw new Error('Cannot fetch LiveChat by GroupId.');
    }
  } catch (error) {
    console.error(error);
    yield put(FieldAction.fetchFieldByIdsFailure(error));
  }
}

export default function* fieldFlow() {
  yield takeLatest(FieldAction.FETCH_FIELD_BY_IDS.START, fetchFieldByIds);
}
