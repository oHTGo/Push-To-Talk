import { IRequest2Server, IResponse2Client } from '../../interfaces/ICommon';
import { setStorage } from '../storage';
import { IShortcutService } from './IShortcutService';
import { FailureCallback, MessageCallback, SuccessCallback } from './types';

export class GlobalShortcutService implements IShortcutService {
  private ws!: WebSocket;
  private isConnected: boolean = false;
  private isEnabled = false;
  private isDown: boolean = false;

  async init(callback: MessageCallback) {
    setTimeout(async () => {
      if (!this.isConnected && this.isEnabled) {
        try {
          this.ws = new WebSocket('ws://localhost:1111');
          await this.onOpen();
          await this.onClose();
          await this.onMessage(callback);
        } catch (error) {
          console.log(error);
          this.isConnected = false;
        }
      }

      if (!this.isConnected) this.init(callback);
    }, 2000);
  }

  private request(body: IRequest2Server) {
    this.ws.send(JSON.stringify(body));
  }

  private async onOpen() {
    this.ws.onopen = () => {
      this.isConnected = true;
      setStorage('serverStatus', 'true');

      const request: IRequest2Server = {
        token: '1',
      };

      this.request(request);
    };
  }

  private async onClose() {
    this.ws.onclose = () => {
      this.isConnected = false;
      setStorage('serverStatus', 'false');
    };
  }

  private async onMessage(callback: MessageCallback) {
    this.ws.onmessage = (event) => {
      try {
        const res: IResponse2Client = JSON.parse(event.data);

        if (res.error) {
          callback(String(res.message));
          return;
        }

        if (!res.event) return;
        switch (res.event) {
          case 'down':
            this.isDown = true;
            break;
          case 'up':
            this.isDown = false;
            break;
        }
      } catch (error) {
        console.log(error);
      }
    };
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }

  run(successCallback: SuccessCallback, failureCallback: FailureCallback) {
    if (!this.isEnabled) {
      return;
    }

    if (this.isDown) successCallback();
    else failureCallback();
  }
}
