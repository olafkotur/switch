import storage from 'electron-json-storage';
import log from 'electron-log';
import { app, BrowserWindow } from 'electron';
import { ElectronService } from '../src/services/electron';
import { SettingsService } from '../src/services/settings';
import { autoUpdater } from 'electron-updater';
import * as url from 'url';
import * as path from 'path';

// global variables
const DEVELOPMENT = process.env.NODE_ENV === 'development';
let mainWindow: BrowserWindow;

// storage setup
const dataPath = storage.getDataPath();
storage.setDataPath(dataPath);

// check for updates
autoUpdater.logger = log;
// @ts-ignore - dodgy casting from Logger to ElectronLog
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoInstallOnAppQuit = true;
autoUpdater.on('update-downloaded', () => {
  sendStatusToWindow('updateReady');
});

log.info('App starting...');

/**
 * Creates the main window
 */
const createMainWindow = async (): Promise<void> => {
  // fetch user settings
  const userSettings = await SettingsService.fetchList();
  const visibilityKeybind = userSettings.find(v => v.name === 'visibilityKeybind');
  const overlayModeSetting = userSettings.find(v => v.name === 'overlayMode');
  const overlayMode = !!(overlayModeSetting && overlayModeSetting.value === 'true');

  // create main window
  const screenInfo = ElectronService.getScreenInfo();
  mainWindow = new BrowserWindow({
    width: screenInfo.width,
    height: screenInfo.height,
    minHeight: 480,
    minWidth: 720,
    center: true,
    darkTheme: true,
    frame: !overlayMode,
    titleBarStyle: overlayMode ? 'default' : 'hidden',
    transparent: overlayMode,
    backgroundColor: '#1F2225',
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      enableRemoteModule: true,
      allowRunningInsecureContent: true,
      devTools: DEVELOPMENT,
      plugins: true,
    },
  });

  // app configuration
  app.setName('Switch');
  overlayMode && app.dock.hide();

  // window configuration
  ElectronService.setWindowMode(overlayMode, mainWindow);
  ElectronService.setWindowInfo(mainWindow);
  ElectronService.setWindowListeners(mainWindow);
  ElectronService.setGlobalShortcuts(
    mainWindow,
    visibilityKeybind ? visibilityKeybind.value : '',
    overlayMode,
  );

  // render
  if (DEVELOPMENT) {
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

/**
 * Sends a status message to the main window
 * @param status - message to be sent
 * @param window - target browser window
 */
const sendStatusToWindow = (status: string): void => {
  mainWindow.webContents.send('message', status);
};

// launch window
app.on('ready', async () => {
  await createMainWindow();
  setTimeout(() => autoUpdater.checkForUpdatesAndNotify(), 5000); // initial check
  setInterval(() => autoUpdater.checkForUpdatesAndNotify(), 1 * 60 * 1000); // keep checking every hour
});
app.on('window-all-closed', () => {
  app.quit();
});
app.allowRendererProcessReuse = true;
