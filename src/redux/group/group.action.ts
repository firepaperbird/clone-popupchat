import { ActionTypes } from './../types';

export default class GroupAction {
  static FETCH_GROUP_BY_ID = {
    START: 'Group/FETCH_GROUP_BY_ID_START',
    SUCCESS: 'Group/FETCH_GROUP_BY_ID_SUCCESS',
    FAILURE: 'Group/FETCH_GROUP_BY_ID_FAILURE',
  };

  static fetchGroupById = (groupId: string): ActionTypes => ({
    type: GroupAction.FETCH_GROUP_BY_ID.START,
    payload: groupId,
  });

  static fetchGroupByIdSuccess = (payload: unknown): ActionTypes => ({
    type: GroupAction.FETCH_GROUP_BY_ID.SUCCESS,
    payload,
  });

  static fetchGroupByIdFailure = (error: unknown): ActionTypes => ({
    type: GroupAction.FETCH_GROUP_BY_ID.FAILURE,
    payload: error,
  });
}
