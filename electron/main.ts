import storage from 'electron-json-storage';
import log from 'electron-log';
import { app, BrowserWindow, Tray, Menu } from 'electron';
import { ElectronService } from '../src/services/electron';
import { SettingsService } from '../src/services/settings';
import { StorageService } from '../src/services/storage';
import * as url from 'url';
import * as path from 'path';

// env variables
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// global variables
const DEVELOPMENT = process.env.NODE_ENV === 'development';
let mainWindow: BrowserWindow;
let tray: Tray;

// storage setup
const dataPath = storage.getDataPath();
storage.setDataPath(dataPath);

/**
 * Creates the main window
 */
const createMainWindow = async (): Promise<void> => {
  // fetch user settings
  let userSettings = await SettingsService.fetch();

  // @ts-ignore - only used in v1.3.0 release
  if (userSettings && userSettings.data) {
    const res = await StorageService.remove('userSettings');
    log.info('Deleted old userSettings object.');
    if (res) {
      userSettings = await SettingsService.fetch();
    }
  }

  // create main window
  const screenInfo = ElectronService.getScreenInfo();
  mainWindow = new BrowserWindow({
    width: screenInfo.width,
    height: screenInfo.height,
    minHeight: 480,
    minWidth: 720,
    center: true,
    darkTheme: true,
    frame: !userSettings.overlayMode,
    titleBarStyle: userSettings.overlayMode ? 'default' : 'hidden',
    transparent: userSettings.overlayMode,
    backgroundColor: '#1F2225',
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      enableRemoteModule: true,
      devTools: DEVELOPMENT,
      plugins: true,
    },
  });

  // app configuration
  app.setName('Switch');
  userSettings.overlayMode && app.dock.hide();

  // window configuration
  ElectronService.setWindowMode(userSettings.overlayMode, mainWindow);
  ElectronService.setWindowInfo(mainWindow);
  ElectronService.setWindowListeners(mainWindow);
  ElectronService.setGlobalShortcuts(
    mainWindow,
    userSettings.visiblityKeybind,
    userSettings.overlayMode,
  );

  // setup tray items
  tray = new Tray(path.join(__dirname, 'tray@2x.png'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Toggle Show / Hide',
      visible: userSettings.overlayMode,
      click: () => ElectronService.toggleVisibility(mainWindow),
    },
    { type: 'separator', visible: userSettings.overlayMode },
    { label: 'Reload', role: 'reload' },
    { label: 'Quit', role: 'quit' },
  ]);
  tray.setContextMenu(contextMenu);

  // render main window
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
});
app.on('window-all-closed', () => {
  app.quit();
});
app.allowRendererProcessReuse = true;
