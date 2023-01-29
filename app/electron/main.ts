import { app, BrowserWindow, Menu, Tray } from 'electron';
import storage from 'electron-json-storage';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import * as path from 'path';
import * as url from 'url';
import { VISIBILITY_KEYBIND } from '../src/const';
import {
  getScreenInfo,
  getStorage,
  setGlobalShortcuts,
  setWindowInfo,
  setWindowListeners,
  setWindowMode,
  toggleVisibility,
} from './utils';

log.info('App is starting...');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
let mainWindow: BrowserWindow;
let tray: Tray;

const dataPath = storage.getDataPath();
storage.setDataPath(dataPath);

const createMainWindow = async (): Promise<void> => {
  const result = await getStorage('overlayMode');
  log.info(result);
  const overlayMode = false;

  const screenInfo = getScreenInfo();
  mainWindow = new BrowserWindow({
    width: screenInfo.width,
    height: screenInfo.height,
    minHeight: 600,
    minWidth: 800,
    center: true,
    darkTheme: true,
    frame: !overlayMode,
    titleBarStyle: overlayMode ? 'default' : 'hidden',
    transparent: overlayMode,
    backgroundColor: '#F8F9F9',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      devTools: IS_DEVELOPMENT,
    },
  });

  app.setName('Switch');
  overlayMode && app.dock.hide();

  setWindowMode(overlayMode, mainWindow);
  setWindowInfo(mainWindow);
  setWindowListeners(mainWindow);
  setGlobalShortcuts(mainWindow, VISIBILITY_KEYBIND, overlayMode);

  tray = new Tray(path.join(__dirname, 'tray@2x.png'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Toggle Show / Hide',
      visible: overlayMode,
      click: () => toggleVisibility(mainWindow),
    },
    { type: 'separator', visible: overlayMode },
    { label: 'Reload', role: 'reload' },
    { label: 'Quit', role: 'quit' },
  ]);
  tray.setContextMenu(contextMenu);

  if (IS_DEVELOPMENT) {
    mainWindow.loadURL('http://localhost:4000');
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }

  mainWindow.on('closed', () => {
    // @ts-ignore
    mainWindow = null;
  });
};

app.on('ready', async () => {
  await createMainWindow();
  await autoUpdater.checkForUpdates();
});
app.on('window-all-closed', () => {
  app.quit();
});
