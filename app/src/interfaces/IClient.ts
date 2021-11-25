import { WebSocket } from 'ws';

export interface IClient {
  webSocket: WebSocket;
  isLogin: boolean;
}
