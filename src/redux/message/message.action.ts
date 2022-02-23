import { ActionTypes } from './../types';
import { AttachmentPayload, Message } from './types';

export default class MessageAction {
  static FETCH_MESSAGE_BY_CONVERSATION_ID = {
    START: 'Message/FETCH_MESSAGE_BY_CONVERSATION_ID_START',
    SUCCESS: 'Message/FETCH_MESSAGE_BY_CONVERSATION_ID_SUCCESS',
    FAILURE: 'Message/FETCH_MESSAGE_BY_CONVERSATION_ID_FAILURE',
  };

  static SEND_MESSAGE = {
    START: 'Message/SEND_MESSAGE_START',
    SUCCESS: 'Message/SEND_MESSAGE_SUCCESS',
    FAILURE: 'Message/SEND_MESSAGE_FAILURE',
  };

  static SEND_ATTACHMENT = {
    START: 'Message/SEND_ATTACHMENT_START',
    SUCCESS: 'Message/SEND_ATTACHMENT_SUCCESS',
    FAILURE: 'Message/SEND_ATTACHMENT_FAILURE',
  };

  static ADD_MESSAGE = 'Message/ADD_MESSAGE';
  static REMOVE_MESSAGE = 'Message/REMOVE_MESSAGE';
  static SET_ERROR = 'Message/SET_ERROR';

  static removeMessage = (messageId: string): ActionTypes => ({
    type: MessageAction.REMOVE_MESSAGE,
    payload: messageId,
  });

  static sendMessage = (data: any, callback?: (error: Error | null, data: any) => void): ActionTypes => ({
    type: MessageAction.SEND_MESSAGE.START,
    payload: data,
    callback,
  });

  static sendAttachment = (data: AttachmentPayload): ActionTypes<AttachmentPayload> => ({
    type: MessageAction.SEND_ATTACHMENT.START,
    payload: data,
  });

  static sendAttachmentSuccess = (): ActionTypes<Record<string, never>> => ({
    type: MessageAction.SEND_ATTACHMENT.SUCCESS,
  });

  static sendAttachmentFailure = (error: Error): ActionTypes<Error> => ({
    type: MessageAction.SEND_ATTACHMENT.FAILURE,
    payload: error,
  });

  static sendMessageSuccess = (data: any): ActionTypes => ({
    type: MessageAction.SEND_MESSAGE.SUCCESS,
    payload: data,
  });

  static sendMessageFailure = (error: Error): ActionTypes => ({
    type: MessageAction.SEND_MESSAGE.FAILURE,
    payload: error,
  });

  static setError = (error: Error): ActionTypes => ({
    type: MessageAction.SET_ERROR,
    payload: error,
  });

  static addMessage = (message: { [key: string]: any }): ActionTypes => ({
    type: MessageAction.ADD_MESSAGE,
    payload: message,
  });

  static fetchMessageByConversationId = (
    conversationId?: string,
    createdAt?: string,
  ): ActionTypes<{ conversationId?: string; createdAt?: string }> => ({
    type: MessageAction.FETCH_MESSAGE_BY_CONVERSATION_ID.START,
    payload: { conversationId, createdAt },
  });

  static fetchMessageByConversationIdSuccess = (payload: Message[]): ActionTypes => ({
    type: MessageAction.FETCH_MESSAGE_BY_CONVERSATION_ID.SUCCESS,
    payload,
  });

  static setIntroMessage = (message: Message): ActionTypes => ({
    type: MessageAction.FETCH_MESSAGE_BY_CONVERSATION_ID.SUCCESS,
    payload: [message],
  });

  static fetchMessageByConversationIdFailure = (error: unknown): ActionTypes => ({
    type: MessageAction.FETCH_MESSAGE_BY_CONVERSATION_ID.FAILURE,
    payload: error,
  });
}
