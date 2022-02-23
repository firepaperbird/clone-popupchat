import { PersistedState } from 'redux-persist';

const migrations = {
  0: (state: PersistedState): PersistedState => ({ ...state } as PersistedState),
};

export default migrations;
