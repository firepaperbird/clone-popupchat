import ConversationAction from '../conversation/conversation.action';
import { normalizeNewData } from './../../utils/index';
import { ActionTypes, ContactStateTypes } from './../types';
import ContactAction from './contact.action';

const INITIAL_STATE = {
  data: {
    byId: {},
    allIds: [],
  },
  isFetching: false,
  error: null,
};

const contactReducer = (
  state: ContactStateTypes = INITIAL_STATE,
  action: ActionTypes,
): ContactStateTypes => {
  switch (action.type) {
    case ContactAction.ADD_CONTACT:
      return { ...state, data: normalizeNewData(action.payload) };

    case ConversationAction.CLOSE_CONVERSATION.SUCCESS:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default contactReducer;
