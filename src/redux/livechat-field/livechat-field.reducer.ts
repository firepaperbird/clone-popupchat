import { normalizeUpdatedData } from '../../utils/index';
import ConversationAction from '../conversation/conversation.action';
import { LiveChatFieldStateTypes, ActionTypes } from '../types';
import LiveChatAction from './livechat-field.action';

const INITIAL_STATE = {
  data: {
    byId: {},
    allIds: [],
  },
  isFetching: false,
  error: null,
  loading: false,
  liveChatFields: [],
};

const liveChatFieldReducer = (
  state: LiveChatFieldStateTypes = INITIAL_STATE,
  action: ActionTypes,
): LiveChatFieldStateTypes | null => {
  switch (action.type) {
    case LiveChatAction.SET_LIVE_CHAT_FIELDS_FORM:
      return { ...state, liveChatFields: action.payload };
    case LiveChatAction.ADD_LIVECHAT_FIELDS:
      return { ...state, data: normalizeUpdatedData(state.data, action.payload) };
    case LiveChatAction.CHECK_REQUIRED_FIELDS.START:
    case LiveChatAction.CHECK_FINGERPRINT.START:
      return { ...state, loading: true };
    case LiveChatAction.CHECK_REQUIRED_FIELDS.SUCCESS:
    case LiveChatAction.CHECK_FINGERPRINT.SUCCESS:
      return { ...state, loading: false };
    case LiveChatAction.CHECK_REQUIRED_FIELDS.FAILURE:
    case LiveChatAction.CHECK_FINGERPRINT.FAILURE:
      return { ...state, loading: false, error: action.payload };

    case LiveChatAction.CHECK_NEW_INBOUND_CONVERSATIONS.START:
      return { ...state, loading: true };
    case LiveChatAction.CHECK_NEW_INBOUND_CONVERSATIONS.SUCCESS:
      return { ...state, loading: false };
    case LiveChatAction.CHECK_NEW_INBOUND_CONVERSATIONS.FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ConversationAction.CLOSE_CONVERSATION.SUCCESS:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default liveChatFieldReducer;
