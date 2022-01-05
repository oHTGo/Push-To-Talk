import { StorageType } from '../types/StorageType';

export const setStorage = async (key: StorageType, value: string) => {
  chrome.storage.local.set({ [key]: value });
};

export const getStorage = async (key: StorageType): Promise<string | null> => {
  try {
    return (await chrome.storage.local.get(key))[key];
  } catch (error) {
    return null;
  }
};
