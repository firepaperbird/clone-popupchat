import { createSelector } from 'reselect';
import { RootStateTypes, SocketStateTypes } from './../types';

export default class SocketSelector {
  static selectSocket = (state: RootStateTypes): SocketStateTypes => state.socket;

  static selectRooms = createSelector(
    [SocketSelector.selectSocket],
    (socket: SocketStateTypes): Array<string> => socket.rooms,
  );
}
