import { createSelector } from 'reselect';
import { ContactStateTypes, RootStateTypes } from './../types';

export default class ContactSelector {
  static selectContact = (state: RootStateTypes): ContactStateTypes => state.contact;

  static selectDataById = createSelector(
    [ContactSelector.selectContact],
    (contact: ContactStateTypes): { [key: string]: any } => contact.data.byId,
  );

  static selectDataList = createSelector([ContactSelector.selectContact], (contact: ContactStateTypes): any[] =>
    Object.values(contact.data.byId),
  );

  static selectIsFetching = createSelector(
    [ContactSelector.selectContact],
    (contact: ContactStateTypes): boolean => contact.isFetching,
  );

  static selectError = createSelector(
    [ContactSelector.selectContact],
    (contact: ContactStateTypes): unknown => contact.error,
  );
}
