import { ActionTypes } from './../types';

export default class ConversationAction {
  static FETCH_CONVERSATION_BY_ID = {
    START: 'Conversation/FETCH_CONVERSATION_BY_ID_START',
    SUCCESS: 'Conversation/FETCH_CONVERSATION_BY_ID_SUCCESS',
    FAILURE: 'Conversation/FETCH_CONVERSATION_BY_ID_FAILURE',
  };

  static CLOSE_CONVERSATION = {
    START: 'Conversation/CLOSE_CONVERSATION_START',
    SUCCESS: 'Conversation/CLOSE_CONVERSATION_SUCCESS',
    FAILURE: 'Conversation/CLOSE_CONVERSATION_FAILURE',
  };

  static SET_TYPING = 'Conversation/SET_TYPING';

  static setTyping = (isTyping: boolean): ActionTypes => ({
    type: ConversationAction.SET_TYPING,
    payload: isTyping,
  });

  static fetchConversationById = (conversationId: string): ActionTypes => ({
    type: ConversationAction.FETCH_CONVERSATION_BY_ID.START,
    payload: conversationId,
  });

  static fetchConversationByIdSuccess = (payload: unknown): ActionTypes => ({
    type: ConversationAction.FETCH_CONVERSATION_BY_ID.SUCCESS,
    payload,
  });

  static fetchConversationByIdFailure = (error: unknown): ActionTypes => ({
    type: ConversationAction.FETCH_CONVERSATION_BY_ID.FAILURE,
    payload: error,
  });

  static closeConversation = (groupId: string): ActionTypes => ({
    type: ConversationAction.CLOSE_CONVERSATION.START,
    payload: { groupId },
  });

  static closeConversationSuccess = (isClosedByAgent = false): ActionTypes<{ isClosedByAgent?: boolean }> => ({
    type: ConversationAction.CLOSE_CONVERSATION.SUCCESS,
    payload: { isClosedByAgent },
  });

  static closeConversationFailure = (error: Error): ActionTypes<{ error: Error }> => ({
    type: ConversationAction.CLOSE_CONVERSATION.FAILURE,
    payload: { error },
  });
}
