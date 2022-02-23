import { createSelector } from 'reselect';
import { LiveChatFieldStateTypes, RootStateTypes } from '../types';

export default class LiveChatFieldSelector {
  static selectLiveChatField = (state: RootStateTypes): LiveChatFieldStateTypes => state.livechatFields;

  static selectDataById = createSelector(
    [LiveChatFieldSelector.selectLiveChatField],
    (livechatFields: LiveChatFieldStateTypes): { [key: string]: any } => livechatFields.data.byId,
  );

  static selectDataList = createSelector([LiveChatFieldSelector.selectLiveChatField], (livechatFields: LiveChatFieldStateTypes): any[] =>
    Object.values(livechatFields.data.byId),
  );

  static selectIsFetching = createSelector(
    [LiveChatFieldSelector.selectLiveChatField],
    (livechatFields: LiveChatFieldStateTypes): boolean => livechatFields.isFetching,
  );

  static selectError = createSelector(
    [LiveChatFieldSelector.selectLiveChatField],
    (livechatFields: LiveChatFieldStateTypes): unknown => livechatFields.error,
  );

  static selectLoading = createSelector(
    [LiveChatFieldSelector.selectLiveChatField],
    (livechatFields: LiveChatFieldStateTypes): boolean => livechatFields.loading,
  );

  static selectLiveChatFieldForm = createSelector(
    [LiveChatFieldSelector.selectLiveChatField],
    (livechatFields: LiveChatFieldStateTypes): any[] => livechatFields.liveChatFields,
  );
}
