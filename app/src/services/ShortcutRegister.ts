import iohook from 'iohook';
import IsEqual from 'lodash.isequal';
import { IEvent } from '../interfaces/IEvent';

export class ShortcutRegister {
  private static initial: boolean = false;
  private static registeredKeys: {
    status: boolean;
    event?: IEvent;
  } = { status: false };

  static register(successCallback: CallableFunction, failureCallback: CallableFunction): boolean {
    try {
      if (this.initial) iohook.removeAllListeners();

      iohook.on('keydown', (e: IEvent) => {
        this.getShortcut(e);
        if (this.checkKeys(e)) {
          successCallback();
        }
      });
      iohook.on('keyup', (e: IEvent) => {
        if (!this.checkKeys(e)) {
          failureCallback();
        }
      });
      iohook.start(false);
      this.initial = true;

      return true;
    } catch (error) {
      console.log(error);
      iohook.stop();
      return false;
    }
  }

  private static checkKeys(e: IEvent): boolean {
    if (!IsEqual(e, this.registeredKeys.event)) return false;

    return true;
  }

  public static setShortcut() {
    this.registeredKeys.status = true;
    setTimeout(() => {
      this.registeredKeys.status = false;
    }, 2000);
  }

  private static getShortcut(e: IEvent) {
    if (!this.registeredKeys.status) return;
    this.registeredKeys.event = e;
  }
}
