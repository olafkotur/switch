import { app, BrowserWindow, Menu, Tray } from 'electron';
import storage from 'electron-json-storage';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import * as path from 'path';
import * as url from 'url';
import { VISIBILITY_KEYBIND } from '../src/const';
import { ElectronService } from './helper';

log.info('App is starting...');

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
  // TODO: Fetch user settings
  const userSettings = { overlayMode: false };

  // create main window
  const screenInfo = ElectronService.getScreenInfo();
  mainWindow = new BrowserWindow({
    width: screenInfo.width,
    height: screenInfo.height,
    minHeight: 600,
    minWidth: 800,
    center: true,
    darkTheme: true,
    frame: !userSettings.overlayMode,
    titleBarStyle: userSettings.overlayMode ? 'default' : 'hidden',
    transparent: userSettings.overlayMode,
    backgroundColor: '#F8F9F9',
    webPreferences: {
      webviewTag: true,
      devTools: DEVELOPMENT,
    },
  });

  // app configuration
  app.setName('Switch');
  userSettings.overlayMode && app.dock.hide();

  // window configuration
  ElectronService.setWindowMode(userSettings.overlayMode, mainWindow);
  ElectronService.setWindowInfo(mainWindow);
  ElectronService.setWindowListeners(mainWindow);
  ElectronService.setGlobalShortcuts(mainWindow, VISIBILITY_KEYBIND, userSettings.overlayMode);

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
  await autoUpdater.checkForUpdates();
});
app.on('window-all-closed', () => {
  app.quit();
});
