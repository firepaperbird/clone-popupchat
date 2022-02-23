import { GeneralStateTypes, ActionTypes } from './../types';
import { POSITION, VIEW } from './../../enum/livechat';
import GeneralAction from './general.action';
import ConversationAction from '../conversation/conversation.action';

const INITIAL_STATE = {
  position: POSITION.BOTTOM_RIGHT,
  showPopup: false,
  view: VIEW.GROUP_SETTINGS,
  incomingMessage: false,
  showNotification: 0,
  isRead: true,
};

const generalReducer = (state: GeneralStateTypes = INITIAL_STATE, action: ActionTypes): GeneralStateTypes => {
  switch (action.type) {
    case GeneralAction.SET_INCOMING_MESSAGE:
      return { ...state, incomingMessage: action.payload };
    case GeneralAction.SET_SHOW_NOTIFICATION:
      return { ...state, showNotification: state.showNotification + 1 };
    case GeneralAction.SET_POSITION:
      return { ...state, position: action.payload };
    case GeneralAction.SET_SHOW_POPUP:
      return { ...state, showPopup: action.payload, showNotification: action.payload ? 0 : state.showNotification };
    case GeneralAction.SET_VIEW:
      return { ...state, view: action.payload };
    case GeneralAction.SET_IS_READ:
      return {
        ...state,
        isRead: action.payload.isRead,
        showNotification: action.payload.isRead ? 0 : state.showNotification,
      };

    case ConversationAction.CLOSE_CONVERSATION.SUCCESS:
      return { ...INITIAL_STATE, position: state.position, showPopup: true };

    default:
      return state;
  }
};

export default generalReducer;
