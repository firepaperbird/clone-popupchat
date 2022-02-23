import { ActionTypes } from './../types';

export default class UserAction {
  static FETCH_USER_BY_ID = {
    START: 'User/FETCH_USER_BY_ID_START',
    SUCCESS: 'User/FETCH_USER_BY_ID_SUCCESS',
    FAILURE: 'User/FETCH_USER_BY_ID_FAILURE',
  };

  static fetchUserById = (userId: string): ActionTypes => ({
    type: UserAction.FETCH_USER_BY_ID.START,
    payload: userId,
  });

  static fetchUserByIdSuccess = (payload: unknown): ActionTypes => ({
    type: UserAction.FETCH_USER_BY_ID.SUCCESS,
    payload,
  });

  static fetchUserByIdFailure = (error: unknown): ActionTypes => ({
    type: UserAction.FETCH_USER_BY_ID.FAILURE,
    payload: error,
  });
}
