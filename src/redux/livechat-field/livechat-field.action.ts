import { ActionTypes } from '../types';

export default class LiveChatFieldAction {
  static CHECK_REQUIRED_FIELDS = {
    START: 'LiveChatField/CHECK_REQUIRED_FIELDS_START',
    SUCCESS: 'LiveChatField/CHECK_REQUIRED_FIELDS_SUCCESS',
    FAILURE: 'LiveChatField/CHECK_REQUIRED_FIELDS_FAILURE',
  };

  static CHECK_FINGERPRINT = {
    START: 'LiveChatField/CHECK_FINGERPRINT_START',
    SUCCESS: 'LiveChatField/CHECK_FINGERPRINT_SUCCESS',
    FAILURE: 'LiveChatField/CHECK_FINGERPRINT_FAILURE',
  };

  static CHECK_NEW_INBOUND_CONVERSATIONS = {
    START: 'LiveChatField/CHECK_NEW_INBOUND_CONVERSATIONS_START',
    SUCCESS: 'LiveChatField/CHECK_NEW_INBOUND_CONVERSATIONS_SUCCESS',
    FAILURE: 'LiveChatField/CHECK_NEW_INBOUND_CONVERSATIONS_FAILURE',
  };

  static ADD_LIVECHAT_FIELDS = 'LiveChatField/ADD_LIVECHAT';
  static SET_LIVE_CHAT_FIELDS_FORM = 'LiveChatField/SET_LIVE_CHAT_FIELDS_FORM';

  static setLiveChatFieldsForm = (liveChatFields: { [key: string]: any }): ActionTypes => ({
    type: LiveChatFieldAction.SET_LIVE_CHAT_FIELDS_FORM,
    payload: liveChatFields,
  });

  static addLiveChatField = (liveChatFields: { [key: string]: any }): ActionTypes => ({
    type: LiveChatFieldAction.ADD_LIVECHAT_FIELDS,
    payload: liveChatFields,
  });

  static checkRequiredFields = (
    liveChatFields: any[],
    fingerprint: string,
    callback?: (error: Error | null, data: any) => void,
  ): ActionTypes => ({
    type: LiveChatFieldAction.CHECK_REQUIRED_FIELDS.START,
    payload: { liveChatFields, fingerprint },
    callback,
  });

  static checkFingerprint = (
    fingerprint: string,
    liveChatFields: any,
    callback?: (error: Error | null, data: any) => void,
  ): ActionTypes => ({
    type: LiveChatFieldAction.CHECK_FINGERPRINT.START,
    payload: { fingerprint, liveChatFields },
    callback,
  });

  static checkRequiredFieldsSuccess = (): ActionTypes => ({
    type: LiveChatFieldAction.CHECK_REQUIRED_FIELDS.SUCCESS,
  });

  static checkRequiredFieldsFailure = (error: unknown): ActionTypes => ({
    type: LiveChatFieldAction.CHECK_REQUIRED_FIELDS.FAILURE,
    payload: error,
  });

  static checkNewInboundConversation = (groupId: string, conversationId: string): ActionTypes => ({
    type: LiveChatFieldAction.CHECK_NEW_INBOUND_CONVERSATIONS.START,
    payload: { groupId, conversationId },
  });

  static checkNewInboundConversationSuccess = (): ActionTypes => ({
    type: LiveChatFieldAction.CHECK_NEW_INBOUND_CONVERSATIONS.SUCCESS,
  });

  static checkNewInboundConversationFailure = (error: unknown): ActionTypes => ({
    type: LiveChatFieldAction.CHECK_NEW_INBOUND_CONVERSATIONS.FAILURE,
    payload: error,
  });
}
