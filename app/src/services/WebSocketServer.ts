import { IClient } from '../interfaces/IClient';
import { WebSocket, Server } from 'ws';
import { ShortcutRegister } from './ShortcutRegister';
import { IRequest2Server, IResponse2Client } from '../interfaces/ICommon';

export class WebSocketServer {
  private server = new Server({ port: 1111 });
  private token: string = '';
  private clients: IClient[] = [];

  constructor() {
    this.initConnections();
    this.initShortcut();
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

  public async sendMessageToClients(message: IResponse2Client) {
    this.clients.forEach((client) => {
      if (client.isLogin) client.webSocket.send(JSON.stringify(message));
    });
  }

  public async sendMessage(ws: WebSocket, message: IResponse2Client) {
    ws.send(JSON.stringify(message));
  }

  public setToken(token: string) {
    this.token = token;
  }

  private login(ws: WebSocket) {
    const client = this.clients.find((client) => client.webSocket == ws);
    if (!client) return;

    client.isLogin = true;
  }

  private initShortcut(): void {
    ShortcutRegister.register(
      () => {
        this.sendMessageToClients({ event: 'down' });
      },
      () => {
        this.sendMessageToClients({ event: 'up' });
      },
    );
  }

  private executeCommand(ws: WebSocket, data: string) {
    try {
      const response: IRequest2Server = JSON.parse(data);

      if (response.token != this.token) throw new Error('Invalid token');
      this.login(ws);
      this.sendMessage(ws, {
        error: false,
      });
    } catch (error) {
      console.error(error);
      this.sendMessage(ws, { error: true, message: (<Error>error).message });
    }
  }
}
