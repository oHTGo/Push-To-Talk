import { app, BrowserWindow, ipcMain } from 'electron';
import { ShortcutRegister } from './services/ShortcutRegister';
import { StorageService } from './services/StorageService';
import { WebSocketServer } from './services/WebSocketServer';
import path from 'path';

let mainWindow: BrowserWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    height: 150,
    width: 400,
    title: 'Push to talk app',
    show: false,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
};

app.on('ready', () => {
  const storage = new StorageService();
  const wss = new WebSocketServer();

  ipcMain.once('allImagesLoaded', () => {
    mainWindow.show();
  });

  const token = storage.getToken() ?? '';
  ipcMain.once('requestToken', (event) => {
    event.reply('responseToken', token);
    wss.setToken(token);
  });

  ipcMain.on('close', () => {
    app.quit();
  });

  ipcMain.on('token', (_, token) => {
    wss.setToken(token);
    storage.setToken(token);
  });

  ipcMain.on('shortcut', () => {
    mainWindow.hide();
    ShortcutRegister.setShortcut();
    setTimeout(() => {
      mainWindow.show();
    }, 2500);
  });

  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
