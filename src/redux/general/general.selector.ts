import { createSelector } from 'reselect';
import { GeneralStateTypes, RootStateTypes } from './../types';

export default class GeneralSelector {
  static selectGeneral = (state: RootStateTypes): GeneralStateTypes => state.general;

  static selectPosition = createSelector(
    [GeneralSelector.selectGeneral],
    (general: GeneralStateTypes) => general.position,
  );

  static selectView = createSelector(
    [GeneralSelector.selectGeneral],
    (general: GeneralStateTypes): string => general.view,
  );

  static selectShowPopup = createSelector(
    [GeneralSelector.selectGeneral],
    (general: GeneralStateTypes): boolean => general.showPopup,
  );

  static selectShowNotification = createSelector(
    [GeneralSelector.selectGeneral],
    (general: GeneralStateTypes): number => general.showNotification,
  );

  static selectIncomingMessage = createSelector(
    [GeneralSelector.selectGeneral],
    (general: GeneralStateTypes): boolean => general.incomingMessage,
  );

  static selectIsRead = createSelector(
    [GeneralSelector.selectGeneral],
    (general: GeneralStateTypes): boolean => general.isRead,
  );
}
