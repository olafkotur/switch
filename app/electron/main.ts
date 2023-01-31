import { app, BrowserWindow } from 'electron';
import storage from 'electron-json-storage';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import * as path from 'path';
import { VISIBILITY_KEYBIND } from '../src/const';
import { WindowSetup } from '../src/typings';
import {
  getScreenProperties,
  getStorage,
  getWindowProperties,
  setGlobalShortcuts,
  setOverlayMode,
  setupTrayConfiguration,
  setupWindowEvents,
  setWindowOpenHandler,
  setWindowProperties,
} from './utils';

log.info('App is starting...');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
let window: BrowserWindow | null;

const dataPath = storage.getDataPath();
storage.setDataPath(dataPath);

app.setName('Switch');

const createMainWindow = async (): Promise<void> => {
  const screenProperties = getScreenProperties();
  const windowSetup = await getStorage<WindowSetup>('window-setup');
  const overlayMode = windowSetup?.overlayMode ?? false;
  const animatePresets = windowSetup?.animatePresets ?? true;

  window = new BrowserWindow({
    width: screenProperties.width,
    height: screenProperties.height,
    minHeight: 600,
    minWidth: 800,
    center: true,
    darkTheme: true,
    frame: !overlayMode,
    titleBarStyle: overlayMode ? 'default' : 'hidden',
    transparent: overlayMode,
    backgroundColor: '#F8F9F9',
    webPreferences: {
      webviewTag: true,
      devTools: IS_DEVELOPMENT,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const windowProperties = getWindowProperties(window);
  setOverlayMode(window, overlayMode);
  setWindowProperties(window, windowProperties, animatePresets);
  setGlobalShortcuts(window, VISIBILITY_KEYBIND, overlayMode);
  setWindowOpenHandler(window);
  setupWindowEvents(window);
  setupTrayConfiguration(window, overlayMode);

  if (IS_DEVELOPMENT) {
    window.loadURL('http://localhost:4000');
  } else {
    window.loadFile(path.join(__dirname, 'renderer/index.html'));
  }

  window.on('closed', () => {
    window = null;
  });
};

app.on('ready', async () => {
  await createMainWindow();
  await autoUpdater.checkForUpdates();
});
app.on('window-all-closed', () => {
  app.quit();
});
