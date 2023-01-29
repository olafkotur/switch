import { BrowserWindow, ipcMain } from 'electron';
import { WindowSetup } from '../src/typings';
import { getStorage, getWindowProperties, setStorage } from './utils';

export const windowSetupListener = () => {
  ipcMain.on('window-setup', async (_, args) => {
    const windowSetup = await getStorage<WindowSetup>('window-setup');
    const [type, value] = args;

    if (type === 'overlayMode') {
      await setStorage<WindowSetup>('window-setup', { ...windowSetup, overlayMode: value });
    }
  });
};

export const windowEventsListener = (window: BrowserWindow) => {
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
