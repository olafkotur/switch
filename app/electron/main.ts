import { app, BrowserWindow } from 'electron';
import storage from 'electron-json-storage';
import log from 'electron-log';
import updater from 'electron-simple-updater';
import * as path from 'path';
import { AUTO_UPDATE_SOURCE, IS_PRODUCTION, VISIBILITY_KEYBIND } from '../src/const';
import { WindowSetup } from '../src/typings';
import {
  getScreenProperties,
  getStorage,
  getWindowProperties,
  setGlobalShortcuts,
  setOverlayMode,
  setupEvents,
  setupTrayConfiguration,
  setWindowOpenHandler,
  setWindowProperties,
} from './utils';

log.transports.file.resolvePath = (vars) => {
  return path.join(vars.libraryTemplate.replace('{appName}', 'Switch'), vars.fileName ?? '');
};
log.info('App is starting...');

const dataPath = storage.getDataPath();
storage.setDataPath(dataPath);

app.setName('Switch');

const createMainWindow = async (): Promise<void> => {
  const screenProperties = getScreenProperties();
  const windowSetup = await getStorage<WindowSetup>('window-setup');
  const overlayMode = windowSetup?.overlayMode ?? false;
  const animatePresets = windowSetup?.animatePresets ?? true;

  const window = new BrowserWindow({
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
      devTools: !IS_PRODUCTION,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const windowProperties = getWindowProperties(window);
  setOverlayMode(window, overlayMode);
  setWindowProperties(window, windowProperties, animatePresets);
  setGlobalShortcuts(window, VISIBILITY_KEYBIND, overlayMode);
  setWindowOpenHandler(window);
  setupEvents(window);
  setupTrayConfiguration(window, overlayMode);

  if (IS_PRODUCTION) {
    window.loadFile(path.join(__dirname, 'renderer/index.html'));
  } else {
    window.loadURL('http://localhost:4000');
  }
};

app.on('ready', async () => {
  await createMainWindow();
  updater.init({ autoDownload: true, checkUpdateOnStart: false, url: AUTO_UPDATE_SOURCE });
});

app.on('window-all-closed', () => {
  app.quit();
});
