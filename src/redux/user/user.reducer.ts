import ConversationAction from '../conversation/conversation.action';
import { normalizeUpdatedData } from './../../utils/index';
import { ActionTypes, UserStateTypes } from './../types';
import UserAction from './user.action';

const INITIAL_STATE = {
  data: {
    byId: {},
    allIds: [],
  },
  isFetching: false,
  error: null,
};

const userReducer = (state: UserStateTypes = INITIAL_STATE, action: ActionTypes): UserStateTypes => {
  switch (action.type) {
    case UserAction.FETCH_USER_BY_ID.START:
      return { ...state, isFetching: true };
    case UserAction.FETCH_USER_BY_ID.SUCCESS:
      return { ...state, isFetching: false, data: normalizeUpdatedData(state.data, action.payload) };
    case UserAction.FETCH_USER_BY_ID.FAILURE:
      return { ...state, isFetching: false, error: action.payload };

    case ConversationAction.CLOSE_CONVERSATION.SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default userReducer;
