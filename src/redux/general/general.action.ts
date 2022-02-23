import ActionButton from 'antd/lib/modal/ActionButton';
import { ActionTypes } from './../types';

export default class GeneralAction {
  static SET_POSITION = 'General/SET_POSITION';

  static SET_VIEW = 'General/SET_VIEW';

  static SET_SHOW_POPUP = 'General/SET_SHOW_POPUP';

  static SET_SHOW_NOTIFICATION = 'General/SET_SHOW_NOTIFICATION';

  static SET_INCOMING_MESSAGE = 'General/SET_INCOMING_MESSAGE';

  static SET_IS_READ = 'General/SET_IS_READ';

  static REHYDRATION_SUCCESS = 'persist/REHYDRATE_SUCCESS';

  static setIncomingMessage = (incomingMessage: boolean): ActionTypes<boolean> => ({
    type: GeneralAction.SET_INCOMING_MESSAGE,
    payload: incomingMessage,
  });

  static setShowNotification = (showNotification: boolean): ActionTypes<{ showNotification: boolean }> => ({
    type: GeneralAction.SET_SHOW_NOTIFICATION,
    payload: { showNotification },
  });

  static setPosition = (position: string): ActionTypes<string> => ({
    type: GeneralAction.SET_POSITION,
    payload: position,
  });

  static setView = (view: string): ActionTypes<string> => ({
    type: GeneralAction.SET_VIEW,
    payload: view,
  });

  static setShowPopup = (showPopup: boolean): ActionTypes<boolean> => ({
    type: GeneralAction.SET_SHOW_POPUP,
    payload: showPopup,
  });

  static setIsRead = (isRead: boolean): ActionTypes<{ isRead: boolean }> => ({
    type: GeneralAction.SET_IS_READ,
    payload: { isRead },
  });
}
