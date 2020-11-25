import { app, BrowserWindow, Menu } from 'electron';
import { ElectronService } from '../src/services/electron';
import * as path from 'path';
import * as url from 'url';
import * as _ from 'lodash';

require('dotenv').config();

const createWindow = (): void => {
  let screenInfo = ElectronService.getScreenInfo();
  let mainWindow: BrowserWindow = new BrowserWindow({
    width: screenInfo.width,
    height: screenInfo.height,
    minHeight: 480,
    minWidth: 720,
    frame: false,
    center: true,
    transparent: true,
    backgroundColor: '#1F2225',
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      enableRemoteModule: true,
    },
  });

  // extra configuration required for windows to float above full screen apps
  app.dock.hide();
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);
  mainWindow.setAlwaysOnTop(true, 'screen-saver');

  screenInfo = ElectronService.setGlobalShortcuts(mainWindow, screenInfo);
  ElectronService.setDefaultWindow(mainWindow);
  ElectronService.setWindowListeners(mainWindow);

  // render config
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000');
  } else {
    // prevent window reloads and block devtools
    Menu.setApplicationMenu(Menu.buildFromTemplate([])); // macOS
    mainWindow.removeMenu(); // windows

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

// launch window
app.on('ready', createWindow).whenReady();
app.allowRendererProcessReuse = true;
