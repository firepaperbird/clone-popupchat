import { normalizeNewData } from './../../utils/index';
import { FieldStateTypes, ActionTypes } from './../types';
import FieldAction from './field.action';

const INITIAL_STATE = {
  data: {
    byId: {},
    allIds: [],
  },
  isFetching: false,
  error: null,
};

const fieldReducer = (state: FieldStateTypes = INITIAL_STATE, action: ActionTypes): FieldStateTypes => {
  switch (action.type) {
    case FieldAction.FETCH_FIELD_BY_IDS.START:
      return { ...state, isFetching: true };
    case FieldAction.FETCH_FIELD_BY_IDS.SUCCESS:
      return { ...state, isFetching: false, data: normalizeNewData(action.payload) };
    case FieldAction.FETCH_FIELD_BY_IDS.FAILURE:
      return { ...state, isFetching: false, error: action.payload };
    default:
      return state;
  }
};

export default fieldReducer;
