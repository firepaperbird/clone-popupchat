import { createSelector } from 'reselect';
import { FieldStateTypes, RootStateTypes } from './../types';

export default class FieldSelector {
  static selectFields = (state: RootStateTypes): FieldStateTypes => state.fields;

  static selectDataById = createSelector(
    [FieldSelector.selectFields],
    (fields: FieldStateTypes): { [key: string]: any } => fields.data.byId,
  );

  static selectDataList = createSelector([FieldSelector.selectFields], (fields: FieldStateTypes): any[] =>
    Object.values(fields.data.byId),
  );

  static selectIsFetching = createSelector(
    [FieldSelector.selectFields],
    (fields: FieldStateTypes): boolean => fields.isFetching,
  );

  static selectError = createSelector([FieldSelector.selectFields], (fields: FieldStateTypes): unknown => fields.error);
}
