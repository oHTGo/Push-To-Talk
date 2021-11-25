import { IClient } from '../interfaces/IClient';
import { WebSocket, Server } from 'ws';
import { ShortcutRegister } from './ShortcutRegister';

export class WebSocketServer {
  private server = new Server({ port: 1111 });
  private token: string = '';
  private clients: IClient[] = [];

  constructor() {
    this.initConnections();
  }

  private initConnections() {
    this.server.on('connection', (ws: WebSocket) => {
      this.initReceiveMessages(ws);
      this.clients.push({ webSocket: ws, isLogin: false });
    });
  }

  private initReceiveMessages(ws: WebSocket) {
    ws.on('message', (dataBuffer: Buffer) => {
      const data = dataBuffer.toString('utf8');
      this.executeCommand(ws, data);
    });
  }

  public sendMessageToClients(message: string) {
    this.clients.forEach((client) => {
      if (client.isLogin) client.webSocket.send(message);
    });
  }

  public setToken(token: string) {
    this.token = token;
  }

  private setIsLogin(ws: WebSocket) {
    const client = this.clients.find((client) => client.webSocket == ws);
    if (!client) return;

    client.isLogin = true;
  }

  private checkLogin(ws: WebSocket): boolean {
    const client = this.clients.find((client) => client.webSocket == ws && client.isLogin);
    return client ? true : false;
  }

  private setShortcut(keys: string) {
    const status = ShortcutRegister.register(keys, () => {
      this.sendMessageToClients('ping');
    });

    if (status) this.sendMessageToClients('Success');
    else this.sendMessageToClients('Failure');
  }

  private executeCommand(ws: WebSocket, data: string) {
    try {
      const spliter = data.split(':');
      const command = spliter[0].toLocaleLowerCase();
      const args = spliter[1] ?? '';

      switch (command) {
        case 'login':
          if (this.token === args) this.setIsLogin(ws);
          break;
        case 'set':
          if (!this.checkLogin(ws)) return;

          this.setShortcut(args);
          break;
        default:
      }
    } catch (error) {
      console.error(error);
    }
  }
}
