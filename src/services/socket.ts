/* eslint-disable no-template-curly-in-string */
import { SocketIOTypes } from '../types';
import { template } from 'lodash';
import io from 'socket.io-client';
import SocketAction from '../redux/socket/socket.action';
import { store } from '../redux/configureStore';

export const ROOM_NAME = {
  CONNECTION: 'connections',
  GROUP: template('ROOM_GROUPID_${groupId}'),
  USER: template('ROOM_USERID_${userId}'),
  OWNER: template('ROOM_OWNERID_${ownerId}'),
};

const defaultConfig = {
  reconnection: true,
  reconnectionAttempts: 'inifinity',
  reconnectionDelay: 1000,
  reconnectionDelayMax: 3000,
  randomizationFactor: 0.5,
  timeout: 20000,
  autoConnect: true,
  path: '/socket.io',
  transports: ['websocket'],
  rejectUnauthorized: false,
};

class SocketIO implements SocketIOTypes {
  url: string;
  config: any;
  socket: ReturnType<typeof io>;

  constructor(url: string, config?: any) {
    console.log(url);
    this.url = url;
    this.config = config;
    this.socket = io(url, config || defaultConfig);
    this.connect();

    this.joinRoom = this.joinRoom.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
    this.joinConnectionRoom = this.joinConnectionRoom.bind(this);
    this.leaveConnectionRoom = this.leaveConnectionRoom.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.on = this.on.bind(this);
    this.emit = this.emit.bind(this);
  }

  get isConnected() {
    return this.socket.connected;
  }

  connect() {
    this.socket.on('connect_error', (error) => {
      console.log(
        '%cSOCKET CONNECTION ERROR',
        'background-color: red; color: white; padding: 5px; border-radius: 5px;',
      );
    });

    this.socket.on('connect_timeout', () => {
      console.log(
        '%cSOCKET CONNECTION TIMEOUT',
        'background-color: yellow; color: black; padding: 5px; border-radius: 5px;',
      );
    });
    this.socket.on('reconnect', (attempt) => {
      console.log(
        '%cSOCKET CONNECTION RECONNECT',
        'background-color: yellow; color: black; padding: 5px; border-radius: 5px;',
      );
    });
    this.socket.on('reconnect_attempt', (error) => {
      console.log(
        '%cSOCKET RECONNECT ATTEMPT',
        'background-color: yellow; color: black; padding: 5px; border-radius: 5px;',
      );
    });
    this.socket.on('reconnecting', (attempt) => {
      console.log('%cSOCKET RECONNECTING', 'background-color: blue; color: white; padding: 5px; border-radius: 5px;');
    });
    this.socket.on('reconnect_error', (error) => {
      console.log('%cSOCKET RECONNECT ERROR', 'background-color: red; color: white; padding: 5px; border-radius: 5px;');
    });
    this.socket.on('reconnect_failed', () => {
      console.log(
        '%cSOCKET RECONNECT FAILED',
        'background-color: orange; color: black; padding: 5px; border-radius: 5px;',
      );
    });

    this.socket.on('connect', () => {
      console.log('%cSOCKET CONNECT', 'background-color: purple; color: white; padding: 5px; border-radius: 5px;');
      store.dispatch(SocketAction.setConnected(true));
      store.dispatch(SocketAction.receiveSocketEvent());
    });
  }

  joinRoom(roomName: string) {
    if (this.socket) this.socket.emit('joinRooms', { userRoom: roomName });
  }

  joinConnectionRoom(userId: string) {
    if (this.socket) this.socket.emit('joinRooms', { userRoom: ROOM_NAME.CONNECTION, identity: userId });
  }

  leaveRoom(roomName: string) {
    if (this.socket) this.socket.emit('leaveRooms', { userRoom: roomName });
  }

  leaveConnectionRoom(userId: string) {
    if (this.socket) this.socket.emit('leaveRooms', { userRoom: ROOM_NAME.CONNECTION, identity: userId });
  }

  emit(roomName: string, eventName: string, data: any): void {
    if (this.socket) this.socket.emit('message', { userRoom: roomName, eventName, data });
  }

  disconnect() {
    if (this.socket) this.socket.disconnect();
  }

  on(eventName: string, handler: (data: any) => void) {
    if (this.socket) {
      this.socket.on(eventName, handler);
    }
  }
}

const SocketService = new SocketIO(process.env.CHATCHILLA_VOICE_SOCKETIO_SERVER || 'http://0.0.0.0:8888');

export default SocketService;

(window as any).SocketServiceLiveChat = SocketService;
