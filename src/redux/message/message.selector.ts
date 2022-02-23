import { createSelector } from 'reselect';
import { MessageStateTypes, RootStateTypes } from './../types';

export default class MessageSelector {
  static selectMessage = (state: RootStateTypes): MessageStateTypes => state.message;

  static selectDataById = createSelector(
    [MessageSelector.selectMessage],
    (message: MessageStateTypes): { [key: string]: any } => message.data.byId,
  );

  static selectDataList = createSelector([MessageSelector.selectMessage], (message: MessageStateTypes): any[] =>
    Object.values(message.data.byId),
  );

  static selectIsFetching = createSelector(
    [MessageSelector.selectMessage],
    (message: MessageStateTypes): boolean => message.isFetching,
  );

  static selectIsSendingAttachment = createSelector(
    [MessageSelector.selectMessage],
    (message: MessageStateTypes): boolean => message.isSendingAttachment,
  );

  static selectError = createSelector(
    [MessageSelector.selectMessage],
    (message: MessageStateTypes): unknown => message.error,
  );
}
