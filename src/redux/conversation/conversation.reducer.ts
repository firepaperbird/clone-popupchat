import { normalizeNewData } from './../../utils/index';
import { ActionTypes, ConversationStateTypes } from './../types';
import ConversationAction from './conversation.action';

const INITIAL_STATE = {
  data: {
    byId: {},
    allIds: [],
  },
  isFetching: false,
  isTyping: false,
  isClosedByAgent: false,
  isClosedByUser: false,
  error: null,
};

const conversationReducer = (
  state: ConversationStateTypes = INITIAL_STATE,
  action: ActionTypes,
): ConversationStateTypes => {
  switch (action.type) {
    case ConversationAction.SET_TYPING:
      return { ...state, isTyping: action.payload };

    case ConversationAction.FETCH_CONVERSATION_BY_ID.START:
      return { ...state, isFetching: true };
    case ConversationAction.FETCH_CONVERSATION_BY_ID.SUCCESS:
      return { ...state, isFetching: false, data: normalizeNewData(action.payload) };
    case ConversationAction.FETCH_CONVERSATION_BY_ID.FAILURE:
      return { ...state, isFetching: false, error: action.payload };

    case ConversationAction.CLOSE_CONVERSATION.START:
      return { ...state, isClosedByUser: true };
    case ConversationAction.CLOSE_CONVERSATION.SUCCESS:
      return { ...INITIAL_STATE, isClosedByAgent: Boolean(action.payload?.isClosedByAgent), isClosedByUser: false };
    case ConversationAction.CLOSE_CONVERSATION.FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default conversationReducer;
