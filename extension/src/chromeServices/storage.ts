export const setStorage = async (key: string, value: string) => {
  chrome.storage.local.set({ [key]: value });
};

export const getStorage = async (key: string): Promise<string> => {
  return (await chrome.storage.local.get(key))[key];
};
