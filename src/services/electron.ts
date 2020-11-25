import { BrowserWindow, globalShortcut, screen } from 'electron';
import { StorageService } from './storage';
import { IScreenInfo, IWindowInfo } from '../typings/d';
import open from 'open';

export const ElectronService = {
  getScreenInfo: (): IScreenInfo => {
    const screenSize = screen.getPrimaryDisplay().workAreaSize;
    return { width: screenSize.width - 50, height: screenSize.height - 25 };
  },

  getWindowInfo: (window: BrowserWindow): IWindowInfo => {
    const size = window.getSize();
    const position = window.getPosition();
    return { width: size[0], height: size[1], xPosition: position[0], yPosition: position[1] };
  },

  setDefaultWindow: async (window: BrowserWindow): Promise<void> => {
    const windowInfo = await StorageService.get('currentWindowInfo') as IWindowInfo | null;
    if (windowInfo) {
      window.setSize(windowInfo.width, windowInfo.height);
      window.setPosition(windowInfo.xPosition, windowInfo.yPosition);
    }
  },

  setGlobalShortcuts: (window: BrowserWindow, screenInfo: IScreenInfo): IScreenInfo => {
    let newScreenSize = { ...screenInfo };
    globalShortcut.register('CommandOrControl+Esc', (): void => {
      // check if screen size has changed - happens if user switches displays
      newScreenSize = { ...ElectronService.getScreenInfo() };
      if (newScreenSize.width !== screenInfo.width || screenInfo.height !== screenInfo.height) {
        window.setSize(screenInfo.width, screenInfo.height);
        window.reload();
      }

      // set visibility
      const isVisible = window.isVisible();
      isVisible ? window.hide() : window.show();

    });
    return newScreenSize;
  },

  setWindowListeners: (window: BrowserWindow): void => {
    // resize event
    window.on('resize', async () => {
      const windowInfo = ElectronService.getWindowInfo(window);
      await StorageService.set('currentWindowInfo', windowInfo);
    });

    // new-window event
    window.webContents.on('new-window', async (event, url) => {
      event.preventDefault();
      await open(url);
    });
  }
};
