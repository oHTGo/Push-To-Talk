import { StorageType } from '../types/StorageType';

export const setStorage = async (key: StorageType, value: string) => {
  chrome.storage.local.set({ [key]: value });
};

export const getStorage = async (key: StorageType): Promise<string> => {
  return (await chrome.storage.local.get(key))[key];
};
