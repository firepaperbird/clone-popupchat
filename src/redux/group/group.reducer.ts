import { normalizeUpdatedData } from './../../utils/index';
import { ActionTypes, GroupStateTypes } from './../types';
import GroupAction from './group.action';

const INITIAL_STATE = {
  data: {
    byId: {},
    allIds: [],
  },
  isFetching: false,
  error: null,
};

const groupReducer = (state: GroupStateTypes = INITIAL_STATE, action: ActionTypes): GroupStateTypes => {
  switch (action.type) {
    case GroupAction.FETCH_GROUP_BY_ID.START:
      return { ...state, isFetching: true };
    case GroupAction.FETCH_GROUP_BY_ID.SUCCESS:
      return { ...state, isFetching: false, data: normalizeUpdatedData(state.data, action.payload) };
    case GroupAction.FETCH_GROUP_BY_ID.FAILURE:
      return { ...state, isFetching: false, error: action.payload };
    default:
      return state;
  }
};

export default groupReducer;
