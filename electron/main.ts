import { app, screen, BrowserWindow, globalShortcut } from 'electron';
import * as path from 'path';
import * as url from 'url';
const open = require('open');

const getWindowSize = (): { width: number, height: number } => {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  return { width: screenSize.width - 50, height: screenSize.height - 25 };
};

const createWindow = (): void => {
  let windowSize = getWindowSize();
  let mainWindow: BrowserWindow | null = new BrowserWindow({
    width: windowSize.width,
    height: windowSize.height,
    frame: false,
    center: true,
    transparent: true,
    backgroundColor: '#1F2225',
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
    },
  });

  // extra configuration required for windows to float above full screen apps
  app.dock.hide();
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);
  mainWindow.setAlwaysOnTop(true, 'screen-saver');

  // register global shortcut to show/hide window
  globalShortcut.register('CommandOrControl+Esc', (): void => {
    if (!mainWindow) {
      return;
    }

    // check if window size has changed - happens if user switches displays
    const newWindowSize = getWindowSize();
    if (newWindowSize.width !== windowSize.width || newWindowSize.height !== windowSize.height) {
      windowSize = { ...newWindowSize };
      mainWindow.setSize(windowSize.width, windowSize.height);
    }

    // set visibility
    const isVisible = mainWindow.isVisible();
    isVisible ? mainWindow.hide() : mainWindow.show();
  });

  // new window handlers
  app.on('browser-window-created', () => {
    console.log('browser-window-created');
  });

  mainWindow.webContents.on('new-window', async (event, url) => {
    event.preventDefault();
    await open(url);
  });


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
    mainWindow = null;
  });
};

// launch window
app.on('ready', createWindow).whenReady();
app.allowRendererProcessReuse = true;
