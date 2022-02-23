import { createSelector } from 'reselect';
import { ConversationStateTypes, RootStateTypes } from './../types';

export default class ConversationSelector {
  static selectConversation = (state: RootStateTypes): ConversationStateTypes => state.conversation;

  static selectDataById = createSelector(
    [ConversationSelector.selectConversation],
    (conversation: ConversationStateTypes): { [key: string]: any } => conversation.data.byId,
  );

  static selectDataList = createSelector(
    [ConversationSelector.selectConversation],
    (conversation: ConversationStateTypes): any[] => Object.values(conversation.data.byId),
  );

  static selectIsFetching = createSelector(
    [ConversationSelector.selectConversation],
    (conversation: ConversationStateTypes): boolean => conversation.isFetching,
  );

  static selectError = createSelector(
    [ConversationSelector.selectConversation],
    (conversation: ConversationStateTypes): unknown => conversation.error,
  );

  static selectIsTyping = createSelector(
    [ConversationSelector.selectConversation],
    (conversation: ConversationStateTypes): boolean => conversation.isTyping,
  );

  static selectIsClosedByAgent = createSelector(
    [ConversationSelector.selectConversation],
    (conversation: ConversationStateTypes): boolean => conversation.isClosedByAgent,
  );

  static selectIsClosedByUser = createSelector(
    [ConversationSelector.selectConversation],
    (conversation: ConversationStateTypes): boolean => conversation.isClosedByUser,
  );
}
