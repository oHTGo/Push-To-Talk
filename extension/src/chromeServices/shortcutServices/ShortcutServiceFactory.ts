import { IShortcutService } from './IShortcutService';
import { ShortcutServiceType } from './ShortcutServiceType';
import { LocalShortcutService } from './LocalShortcutService';
import { GlobalShortcutService } from './GlobalShortcutService';

export class ShortcutServiceFactory {
  static getShortcutService(type: ShortcutServiceType): IShortcutService {
    switch (type) {
      case ShortcutServiceType.LOCAL:
        return new LocalShortcutService();
      case ShortcutServiceType.GLOBAL:
        return new GlobalShortcutService();
    }
  }
}
