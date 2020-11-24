import { app, BrowserWindow, globalShortcut, screen, Menu } from 'electron';
import * as path from 'path';
import * as url from 'url';

const open = require('open');
require('dotenv').config();

const getScreenSize = (): { width: number, height: number } => {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  return { width: screenSize.width - 50, height: screenSize.height - 25 };
};

const createWindow = (): void => {
  let screenSize = getScreenSize();
  let mainWindow: BrowserWindow = new BrowserWindow({
    width: screenSize.width,
    height: screenSize.height,
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

  // register global shortcuts
  globalShortcut.register('CommandOrControl+Esc', (): void => {
    // check if screen size has changed - happens if user switches displays
    const newScreenSize = getScreenSize();
    if (newScreenSize.width !== screenSize.width || screenSize.height !== screenSize.height) {
      screenSize = { ...newScreenSize };
      mainWindow.setSize(screenSize.width, screenSize.height);
      mainWindow.reload();
    }

    // set visibility
    const isVisible = mainWindow.isVisible();
    isVisible ? mainWindow.hide() : mainWindow.show();
  });

  // prevent window reloads and block devtools
  if (process.env.ENV !== 'development') {
    Menu.setApplicationMenu(Menu.buildFromTemplate([])); // macOS
    mainWindow.removeMenu(); // windows
  }

  // web content handlers
  mainWindow.webContents.on('new-window', async (event, url) => {
    event.preventDefault();
    await open(url);
  });

  // render config
  if (process.env.NODE_ENV === 'development') {
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

// launch window
app.on('ready', createWindow).whenReady();
app.allowRendererProcessReuse = true;
