import { BrowserWindow, ipcMain } from 'electron';
import { ChannelEvent, ChannelValue, WindowSetup } from '../src/typings';
import { getStorage, getWindowProperties, setStorage } from './utils';

export const sendWindowEvents = (window: BrowserWindow) => {
  window.on('resize', async () => {
    const windowProperties = getWindowProperties(window);
    window.webContents.send('window-events', ['resize', windowProperties]);
  });

  window.on('enter-full-screen', () => {
    window.webContents.send('window-events', ['full-screen', true]);
  });

  window.on('leave-full-screen', () => {
    window.webContents.send('window-events', ['full-screen', false]);
  });
};

export const receiveWindowSetup = (window: BrowserWindow) => {
  ipcMain.on('window-setup', async (_, args) => {
    const windowSetup = await getStorage<WindowSetup>('window-setup');
    const type = args[0] as ChannelEvent;
    const value = args[1] as ChannelValue;

    if (type === 'window-setup-data') {
      window.webContents.send('window-setup', ['window-setup-data', windowSetup]);
    }

    if (type === 'set-overlay-mode') {
      await setStorage<WindowSetup>('window-setup', { ...windowSetup, overlayMode: value });
    }
  });
};
