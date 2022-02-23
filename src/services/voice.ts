import SIP from 'sip.js';
import axios from 'axios';
import { omit } from 'lodash';

import { store } from '../redux/configureStore';
import { dtmfOption } from './../enum/voice';
import VoiceActions from '../redux/voice/voice.action';

class VoiceService {
  public userAgent: typeof SIP.UA | null;
  public sessions: { [callId: string]: any };
  private callIds: { [callId: string]: any };
  private timer?: number;

  constructor() {
    this.userAgent = null;
    this.sessions = {};
    this.callIds = {};
  }

  setSession = (callId: string, sessionId: string) => {
    const rtcCallId = Object.keys(this.callIds).find((item) => item.includes(callId));
    console.log(
      `%ccallId: ${callId} - sessionId: ${sessionId} 🐰`,
      'background: #000; color: #fff; padding: 8px; border-radius: 10px;',
    );

    if (rtcCallId) {
      this.sessions[sessionId] = this.callIds[rtcCallId];
    }
  };

  getRTCCall = (id: string) => {
    const session = this.sessions[id]; // id = sessionId
    if (session) {
      return session;
    }
    const RTCCallId = Object.keys(this.callIds).find((item) => item.includes(id)); // id = callId
    if (RTCCallId) {
      return this.callIds[RTCCallId];
    }
    return null;
  };

  updateStatus = (data, tState) => {
    console.log(`%c${tState} 🐶`, 'background: green; color: #fff; padding: 8px; border-radius: 10px;');
    if (tState === 'INCOMING_CALL') {
      console.log(`%cINBOUND 🐰`, 'background: #000; color: #fff; padding: 8px; border-radius: 10px;');
      console.log(
        `%cRTCId: ${data?.request.call_id} 👻`,
        'background: red; color: #fff; padding: 8px; border-radius: 10px;',
      );

      const RTCId = data.request.call_id;
      this.callIds[RTCId] = data;
      store.dispatch(VoiceActions.setSession());
      // Listen Session Events
      this.listenForSessionEvents(RTCId);
    }
  };

  doConnect = (config) => {
    this.userAgent = new SIP.UA(config);
    this.userAgent.start();

    this.userAgent.on('connecting', () => store.dispatch(VoiceActions.apDialerStatus('CONNECTING')));
    this.userAgent.on('connected', () => store.dispatch(VoiceActions.apDialerStatus('CONNECTED')));
    this.userAgent.on('disconnected', () => store.dispatch(VoiceActions.apDialerStatus('DISCONNECTED')));
    this.userAgent.on('registered', () => store.dispatch(VoiceActions.registered('REGISTERED')));
    this.userAgent.on('unregistered', (res, cause) => this.updateStatus(cause, 'UNREGISTERED'));
    this.userAgent.on('registrationFailed', (res, cause) => this.updateStatus(cause, 'REGISTRATION_FAILED'));
    this.userAgent.on('invite', (session) => this.updateStatus(session, 'INCOMING_CALL'));
    this.userAgent.on('message', (msg) => this.updateStatus(msg, 'MESSAGE'));
  };

  doRegister = () => {
    this.userAgent.register();
  };

  doUnRegister = () => {
    this.userAgent.unregister();
  };

  doCall = (uri: string, options: any) => {
    store.dispatch(VoiceActions.apDialerStatus('TRYING'));
    const data = this.userAgent.invite(uri, options);
    console.log(`%OUTBOUND 🐰`, 'background: #000; color: #fff; padding: 8px; border-radius: 10px;');
    console.log(
      `%cRTCId: ${data?.request.call_id} 👻`,
      'background: red; color: #fff; padding: 8px; border-radius: 10px;',
    );

    const RTCId = data.request.call_id;
    this.callIds[RTCId] = data;
    store.dispatch(VoiceActions.setSession());

    // Listen Session Events
    this.listenForSessionEvents(RTCId);
  };

  // ======== SESSION ========
  listenForSessionEvents = (callId: string) => {
    const render = {
      remote: document.getElementById('remoteMedia'),
    };

    this.callIds[callId].on('accepted', (res) => {
      store.dispatch(VoiceActions.apDialerStatus('TALKING'));
      // Trigger Timer
      this.timer = window.setInterval(() => store.dispatch(VoiceActions.incCalltimer()), 1000);
      this.callIds[callId].mediaHandler.render(render);
    });
    this.callIds[callId].on('progress', (res) => store.dispatch(VoiceActions.apDialerStatus('RINGING')));
    this.callIds[callId].on('rejected', (res, cause) => this.updateStatus(cause, 'REJECTED'));
    this.callIds[callId].on('failed', (res, cause) => this.updateStatus(cause, 'FAILED'));
    this.callIds[callId].on('terminated', (res, cause) => {
      this.callIds = omit(this.callIds, callId);
      Object.keys(this.sessions).forEach((sessionId) => {
        const session = this.sessions[sessionId];
        if (session.id === callId) {
          this.sessions = omit(this.sessions, sessionId);
        }
      });
      this.updateStatus(cause, 'TERMINATED');
    });
    this.callIds[callId].on('cancel', () => this.updateStatus(null, 'CANCELLED'));
    this.callIds[callId].on('refer', (req) => this.updateStatus(req, 'REFER'));
    this.callIds[callId].on('replaced', (session) => this.updateStatus(session, 'REPLACED'));
    this.callIds[callId].on('dtmf', (req, dtmf) => this.updateStatus(dtmf, 'DTMF'));
    this.callIds[callId].on('muted', () => this.updateStatus(null, 'MUTE'));
    this.callIds[callId].on('unmuted', () => this.updateStatus(null, 'UNMUTE'));
    this.callIds[callId].on('bye', (req) => {
      this.updateStatus(null, 'BYE');
      // Clear timer
      clearInterval(this.timer);
    });
  };

  cancelCall = (sessionId: string) => {
    const session = this.sessions[sessionId];
    if (session) {
      session.cancel();
    }
  };

  endCall = (sessionId: string) => {
    const session = this.sessions[sessionId];
    if (session) {
      session.terminate();
    }
  };

  sendDtmf = (sessionId: string, dtmf: string) => {
    const session = this.sessions[sessionId];
    if (session) {
      session.dtmf(dtmf, dtmfOption);
    }
  };

  muteCall = (sessionId: string) => {
    const session = this.sessions[sessionId];
    if (session) {
      session.mute();
    }
  };

  unmuteCall = (sessionId: string) => {
    const session = this.sessions[sessionId];
    if (session) {
      session.unmute();
    }
  };

  acceptCall = (sessionId: string) => {
    const session = this.sessions[sessionId];
    if (session) {
      session.accept({ media: { constraints: { audio: true, video: false } } });
    }
  };

  fetchLogs = (userId: string) => axios.get(`/calling/logs/${userId}`);
}

const voiceService = new VoiceService();
export default voiceService;
