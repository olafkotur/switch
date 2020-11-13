import { app, screen, BrowserWindow, globalShortcut } from 'electron';
import * as path from 'path';
import * as url from 'url';

const getScreenSize = (): { width: number, height: number } => {
  return screen.getPrimaryDisplay().workAreaSize;
};

const createWindow = (): void => {
  const screenSize = getScreenSize();

  let mainWindow: BrowserWindow | null = new BrowserWindow({
    width: screenSize.width - 50,
    height: screenSize.height - 25,
    frame: false,
    center: true,
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
  globalShortcut.register('CommandOrControl+Esc', () => {
    if (mainWindow) {
      const isVisible = mainWindow.isVisible();
      isVisible ? mainWindow.hide() : mainWindow.show();
      console.log(`main::setting window visibility to - ${!isVisible}`);
    }
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
