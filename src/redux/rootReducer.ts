import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import general from './general/general.reducer';
import socket from './socket/socket.reducer';
import fields from './field/field.reducer';
import livechatFields from './livechat-field/livechat-field.reducer';
import voice from './voice/voice.reducer';
import conversation from './conversation/conversation.reducer';
import group from './group/group.reducer';
import message from './message/message.reducer';
import contact from './contact/contact.reducer';
import user from './user/user.reducer';

const persistedGeneralReducer = persistReducer({ key: 'general', storage, whitelist: ['view'] }, general);
const persistedConversationReducer = persistReducer(
  {
    key: 'conversation',
    storage,
    blacklist: ['isClosedByAgent', 'isClosedByUser'],
  },
  conversation,
);

const rootReducer = combineReducers({
  contact,
  conversation: persistedConversationReducer,
  fields,
  general: persistedGeneralReducer,
  group,
  livechatFields,
  message,
  socket,
  voice,
  user,
});

export default rootReducer;
