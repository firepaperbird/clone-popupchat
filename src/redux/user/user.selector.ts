import { createSelector } from 'reselect';
import { UserStateTypes, RootStateTypes } from '../types';

export default class UserSelector {
  static selectUser = (state: RootStateTypes): UserStateTypes => state.user;

  static selectDataById = createSelector(
    [UserSelector.selectUser],
    (user: UserStateTypes): { [key: string]: any } => user.data.byId,
  );

  static selectDataList = createSelector([UserSelector.selectUser], (user: UserStateTypes): any[] =>
    Object.values(user.data.byId),
  );

  static selectIsFetching = createSelector(
    [UserSelector.selectUser],
    (user: UserStateTypes): boolean => user.isFetching,
  );

  static selectError = createSelector(
    [UserSelector.selectUser],
    (user: UserStateTypes): unknown => user.error,
  );
}
