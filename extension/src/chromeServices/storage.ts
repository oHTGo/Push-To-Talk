import { StorageType } from '../types/StorageType';
import { envConfig } from '../envConfig';

export const setStorage = async (key: StorageType, value: string) => {
  if (envConfig().NODE_ENV === 'development') {
    window.localStorage.setItem(key, value);
  } else {
    chrome.storage.local.set({ [key]: value });
  }
};

export const getStorage = async (key: StorageType): Promise<string | null> => {
  try {
    if (envConfig().NODE_ENV === 'development') {
      return window.localStorage.getItem(key);
    } else {
      return (await chrome.storage.local.get(key))[key];
    }
  } catch (error) {
    return null;
  }
};
