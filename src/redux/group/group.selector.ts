import { WORKFLOW_TYPE, WORKFLOW_LISTEN_FOR, WORKFLOW_STRATEGY } from './../../enum/workflow';
import { createSelector } from 'reselect';
import { GroupStateTypes, RootStateTypes } from './../types';
import { get, isEmpty } from 'lodash';
import { REQUIRED_FIELD } from '../../enum/livechat';
export default class GroupSelector {
  static selectGroup = (state: RootStateTypes): GroupStateTypes => state.group;

  static selectDataById = createSelector(
    [GroupSelector.selectGroup],
    (group: GroupStateTypes): { [key: string]: any } => group.data.byId,
  );

  static selectDataList = createSelector([GroupSelector.selectGroup], (group: GroupStateTypes): any[] => {
    return Object.values(group.data.byId);
  });

  static selectNewInboundConversationWorkflow = createSelector(
    [GroupSelector.selectGroup],
    (group: GroupStateTypes): boolean => {
      const groups = Object.values(group.data.byId);
      const groupData = groups[0];

      if (groupData) {
        const newInboundConversation = groupData.workflows?.find(
          (item) =>
            item.type === WORKFLOW_TYPE.NEW_INBOUND_CONVERSATIONS &&
            item.listen_for === WORKFLOW_LISTEN_FOR.ALL_MESSAGE &&
            item.strategy === WORKFLOW_STRATEGY.MESSAGE,
        );

        if (newInboundConversation) {
          return true;
        }
      }
      return false;
    },
  );

  static selectHasRequired = createSelector([GroupSelector.selectGroup], (group: GroupStateTypes): boolean => {
    const groups = Object.values(group.data.byId);
    if (isEmpty(groups)) return false;
    const liveChatRequiredFields = get(groups[0], 'liveChat_requiredFields');
    const hasRequired = liveChatRequiredFields.find((lrf) => lrf.id in REQUIRED_FIELD);
    return !!hasRequired;
  });

  static selectIsFetching = createSelector(
    [GroupSelector.selectGroup],
    (group: GroupStateTypes): boolean => group.isFetching,
  );

  static selectGroupLoaded = createSelector(
    [GroupSelector.selectGroup],
    (group: GroupStateTypes): boolean => !isEmpty(group.data.byId),
  );

  static selectError = createSelector([GroupSelector.selectGroup], (group: GroupStateTypes): unknown => group.error);
}
