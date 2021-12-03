import { FailureCallback, MessageCallback, SuccessCallback } from './types';

export interface IShortcutService {
  init(callback: MessageCallback): void; // eslint-disable-line no-unused-vars
  enable(): void;
  disable(): void;
  run(successCallback: SuccessCallback, failureCallback: FailureCallback): void; // eslint-disable-line no-unused-vars
}
