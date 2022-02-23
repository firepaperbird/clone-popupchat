import { ActionTypes } from './../types';

export default class ContactAction {
  static ADD_CONTACT = 'Contact/ADD_CONTACT';

  static addContact = (payload: any): ActionTypes => ({
    type: ContactAction.ADD_CONTACT,
    payload,
  });
}
