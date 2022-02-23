import { sortBy } from 'lodash';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import GeneralAction from './general/general.action';
import MessageAction from './message/message.action';
import migrations from './migration';

const persistConfig = {
  key: 'root',
  storage,
  migrations: createMigrate(migrations, { debug: process.env.NODE_ENV === 'local' }),
  version: 0,
  whitelist: ['contact', 'message', 'livechatFields', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
const persistor = persistStore(store, {}, () => {
  sagaMiddleware.run(rootSaga);

  const rootState = store.getState();
  const isConversationClosed = rootState.conversation.isClosedByAgent;
  const conversation = Object.values(rootState.conversation.data.byId)[0];
  const firstMessage = sortBy(Object.values(rootState.message.data.byId), 'createdAt')[0];
  const contact = Object.values(rootState.contact.data.byId)[0];

  if (!isConversationClosed && contact) {
    store.dispatch(MessageAction.fetchMessageByConversationId(conversation.id, firstMessage.createdAt));
  }

  store.dispatch({ type: GeneralAction.REHYDRATION_SUCCESS });
});

export { store, persistor };
