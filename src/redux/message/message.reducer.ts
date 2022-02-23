import ConversationAction from '../conversation/conversation.action';
import { normalizeUpdatedData, removeDataById } from './../../utils/index';
import { ActionTypes, MessageStateTypes } from './../types';
import MessageAction from './message.action';

const INITIAL_STATE = {
  data: {
    byId: {},
    allIds: [],
  },
  isFetching: false,
  isSending: false,
  isSendingAttachment: false,
  error: null,
};

const messageReducer = (state: MessageStateTypes = INITIAL_STATE, action: ActionTypes): MessageStateTypes => {
  switch (action.type) {
    case MessageAction.FETCH_MESSAGE_BY_CONVERSATION_ID.START:
      return { ...state, isFetching: true };
    case MessageAction.FETCH_MESSAGE_BY_CONVERSATION_ID.SUCCESS:
      return { ...state, isFetching: false, data: normalizeUpdatedData(state.data, action.payload) };
    case MessageAction.FETCH_MESSAGE_BY_CONVERSATION_ID.FAILURE:
      return { ...state, isFetching: false, error: action.payload };

    case MessageAction.SEND_MESSAGE.START:
      return { ...state, isSending: true };
    case MessageAction.SEND_MESSAGE.SUCCESS:
      return { ...state, isSending: false, data: normalizeUpdatedData(state.data, action.payload) };
    case MessageAction.SEND_MESSAGE.FAILURE:
      return { ...state, isSending: false, error: action.payload };

    case MessageAction.SEND_ATTACHMENT.START:
      return { ...state, isSendingAttachment: true, isSending: true };
    case MessageAction.SEND_ATTACHMENT.SUCCESS:
      return {
        ...state,
        isSendingAttachment: false,
        isSending: false,
      };
    case MessageAction.SEND_ATTACHMENT.FAILURE:
      return { ...state, isSendingAttachment: false, isSending: false, error: action.payload };

    case MessageAction.ADD_MESSAGE:
      return { ...state, data: normalizeUpdatedData(state.data, action.payload) };
    case MessageAction.REMOVE_MESSAGE:
      return { ...state, data: removeDataById(state.data, action.payload) };
    case MessageAction.SET_ERROR:
      return { ...state, error: action.payload };

    case ConversationAction.CLOSE_CONVERSATION.SUCCESS:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default messageReducer;
