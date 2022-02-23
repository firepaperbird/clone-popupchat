import { ActionTypes } from './../types';

export default class FieldAction {
  static FETCH_FIELD_BY_IDS = {
    START: 'Field/FETCH_FIELD_BY_IDS_START',
    SUCCESS: 'Field/FETCH_FIELD_BY_IDS_SUCCESS',
    FAILURE: 'Field/FETCH_FIELD_BY_IDS_FAILURE',
  };

  static fetchFieldByIds = (fieldIds: string[]): ActionTypes => ({
    type: FieldAction.FETCH_FIELD_BY_IDS.START,
    payload: fieldIds,
  });

  static fetchFieldByIdsSuccess = (payload: unknown): ActionTypes => ({
    type: FieldAction.FETCH_FIELD_BY_IDS.SUCCESS,
    payload,
  });

  static fetchFieldByIdsFailure = (error: unknown): ActionTypes => ({
    type: FieldAction.FETCH_FIELD_BY_IDS.FAILURE,
    payload: error,
  });
}
