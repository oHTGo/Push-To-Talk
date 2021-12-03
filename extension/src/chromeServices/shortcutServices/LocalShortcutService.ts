import { IShortcutService } from './IShortcutService';
import { FailureCallback, MessageCallback, SuccessCallback } from './types';

export class LocalShortcutService implements IShortcutService {
  private keyDownFunction: any;
  private keyUpFunction: any;
  private keys = new Map<string, boolean>();
  private registeredKeys: string[] = [];
  private isEnabled: boolean = false;

  async init(callback: MessageCallback) {
    this.keyDownFunction = (event: any) => {
      this.keys.set(event.key, true);
    };
    this.keyUpFunction = (event: any) => {
      this.keys.delete(event.key);
    };
    callback('Initializing success');

    this.registeredKeys = ['Alt', 'c'];
  }

  enable() {
    this.isEnabled = true;
    document.body.addEventListener('keydown', this.keyDownFunction, true);
    document.body.addEventListener('keyup', this.keyUpFunction, true);
  }

  disable() {
    this.isEnabled = false;
    document.body.removeEventListener('keydown', this.keyDownFunction, true);
    document.body.removeEventListener('keyup', this.keyUpFunction, true);
  }

  run(successCallback: SuccessCallback, failureCallback: FailureCallback) {
    if (!this.isEnabled) {
      return;
    }

    if (this.checkKeys()) successCallback();
    else failureCallback();
  }

  setKeys(keys: string[]) {
    this.registeredKeys = keys;
  }

  private checkKeys(): boolean {
    for (const key of this.registeredKeys) {
      if (!this.keys.has(key)) return false;
    }

    return true;
  }
}