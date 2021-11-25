import { app, BrowserWindow, ipcMain } from 'electron';
import { StorageService } from './services/StorageService';
import { WebSocketServer } from './services/WebSocketServer';

function createWindow() {
  const mainWindow = new BrowserWindow({
    height: 200,
    width: 400,
    title: 'Push to talk app',
    show: false,
    frame: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadFile('index.html');
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
}

app.on('ready', () => {
  const storage = new StorageService();
  const wss = new WebSocketServer();

  const token = storage.getToken() ?? '';
  ipcMain.once('requestToken', (event) => {
    event.reply('responseToken', token);
    wss.setToken(token);
  });

  ipcMain.on('token', (_, token) => {
    wss.setToken(token);
    storage.setToken(token);
  });

  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
