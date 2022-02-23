import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { persistor, store } from './redux/configureStore';
import { AppParam } from './types';

declare global {
  interface Window {
    initChatchillaLiveChat: any;
    themeColor:string;
    previewData:any;
  }
}

window.initChatchillaLiveChat = (params: AppParam) => {
  if (!params.groupId && !params.isPreview) {
    console.error(`[live-chat-${process.env.NODE_ENV}]`, 'Missing parameters for initChat');
  }

  const bubbleChatRoot = document.createElement('span');
  bubbleChatRoot.setAttribute('id', 'chatchilla_bubble_chat');
  bubbleChatRoot.setAttribute('class', 'chatchilla_bubble_chat');
  document.body.appendChild(bubbleChatRoot);
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App groupId={params.groupId} position={params.position} isPreview={params.isPreview} />
      </PersistGate>
    </Provider>,
    document.getElementById('chatchilla_bubble_chat'),
  );
};
