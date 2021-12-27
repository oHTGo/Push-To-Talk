const { clipboard, ipcRenderer } = require('electron');

const randomToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const tokenDOM: HTMLInputElement = document.getElementById('token') as HTMLInputElement;

document.getElementById('copy-btn').addEventListener('click', () => {
  const token = tokenDOM.value;
  clipboard.writeText(token);
});

document.getElementById('generate-btn').addEventListener('click', () => {
  const newToken = randomToken();
  tokenDOM.value = newToken;
});

document.getElementById('save-btn').addEventListener('click', () => {
  const token = tokenDOM.value;
  ipcRenderer.send('token', token);
});

document.getElementById('set-shortcut-btn').addEventListener('click', () => {
  ipcRenderer.send('shortcut');
});

window.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.sendSync('requestToken', '');
  ipcRenderer.once('responseToken', (_, token) => {
    tokenDOM.value = token;
  });
});
