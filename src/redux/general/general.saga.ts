import { ActionTypes } from './../types';
import { put, debounce } from 'redux-saga/effects';
import GeneralAction from '../general/general.action';

function * setIncommingMessage(action: ActionTypes) {
  if (action.payload) {
    yield put(GeneralAction.setIncomingMessage(false));
  }
}

export default function* generalFlow() {
  yield debounce(1000, GeneralAction.SET_INCOMING_MESSAGE, setIncommingMessage);
}
