import { globalShortcut } from 'electron';

export class ShortcutRegister {
  static register(keys: string, callback: CallableFunction): boolean {
    try {
      if (globalShortcut.isRegistered(keys)) globalShortcut.unregister(keys);

      const hook = globalShortcut.register(keys, () => callback());
      if (!hook) throw new Error('The shortcut was registered failed.');

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
