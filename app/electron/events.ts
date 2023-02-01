import { BrowserWindow, ipcMain } from 'electron';
import updater from 'electron-simple-updater';
import { ChannelEvent, ChannelValue, WindowProperties, WindowSetup } from '../src/typings';
import { getScreenProperties, getStorage, setStorage, setWindowProperties } from './utils';

export const sendWindowEvents = (window: BrowserWindow) => {
  window.on('enter-full-screen', () => {
    window.webContents.send('window-events', ['full-screen', true]);
  });

  window.on('leave-full-screen', () => {
    window.webContents.send('window-events', ['full-screen', false]);
  });
};

export const sendUpdateEvents = (window: BrowserWindow) => {
  updater.on('update-available', () => {
    window.webContents.send('app-updates', ['update-available', true]);
  });

  updater.on('update-not-available', async () => {
    window.webContents.send('app-updates', ['update-available', false]);
  });

  updater.on('update-downloading', () => {
    window.webContents.send('app-updates', ['update-downloading', true]);
  });

  updater.on('update-downloaded', () => {
    window.webContents.send('app-updates', ['update-downloaded', true]);
  });
};

export const receiveUpdateEvents = (_window: BrowserWindow) => {
  ipcMain.on('app-updates', (_, args) => {
    const type = args[0] as ChannelEvent;

    if (type === 'check-for-update') {
      updater.checkForUpdates();
    }

    if (type === 'quit-and-install') {
      updater.quitAndInstall();
    }
  });
};

export const receiveWindowSetup = (window: BrowserWindow) => {
  ipcMain.on('window-setup', async (_, args) => {
    const windowSetup = await getStorage<WindowSetup>('window-setup');
    const type = args[0] as ChannelEvent;
    const value = args[1] as ChannelValue;

    // override overlay mode with current electron config
    if (windowSetup) {
      windowSetup.overlayMode = window.isAlwaysOnTop();
    }

    if (type === 'window-setup-data') {
      window.webContents.send('window-setup', ['window-setup-data', windowSetup]);
    }

    if (type === 'set-overlay-mode') {
      await setStorage<WindowSetup>('window-setup', { ...windowSetup, overlayMode: value });
    }

    if (type === 'set-animate-presets') {
      await setStorage<WindowSetup>('window-setup', { ...windowSetup, animatePresets: value });
    }
  });
};

export const receiveWindowPresets = (window: BrowserWindow) => {
  ipcMain.on('window-presets', async (_, args) => {
    const windowSetup = await getStorage<WindowSetup>('window-setup');
    const screenProperties = getScreenProperties();
    const type = args[0] as ChannelEvent;
    const value = args[1] as ChannelValue;

    if (type === 'apply-window-preset') {
      const width = screenProperties.width * value;
      const properties: WindowProperties = {
        width,
        height: screenProperties.height,
        xPosition: 0,
        yPosition: 0,
      };
      setWindowProperties(window, properties, windowSetup?.animatePresets ?? true);
    }
  });
};

export const receiveStorageControl = (window: BrowserWindow) => {
  ipcMain.on('storage-control', async (_, args) => {
    const type = args[0] as ChannelEvent;

    if (type === 'clear-storage') {
      window.webContents.session.clearCache();
      window.webContents.session.clearStorageData();
    }
  });
};
