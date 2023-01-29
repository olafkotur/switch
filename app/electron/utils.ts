import { app, BrowserWindow, globalShortcut, screen } from 'electron';
import { StorageService } from './storage';
import storage from 'electron-json-storage';

let previousScreenInfo: ScreenInfo | null = null;

type ScreenInfo = any;
type WindowInfo = any;

export const getStorage = async (key: string): Promise<object | null> => {
  return await new Promise((resolve, reject) => {
    storage.get(key, (_error, data) => {
      if (data) {
        resolve(data);
      }
      reject(null);
    });
  });
};

export const getScreenInfo = (): ScreenInfo => {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  return { width: screenSize.width, height: screenSize.height };
};

export const getWindowInfo = (window: BrowserWindow): WindowInfo => {
  const size = window.getSize();
  const position = window.getPosition();
  return {
    width: size[0],
    height: size[1],
    xPosition: position[0],
    yPosition: position[1],
  };
};

export const setWindowInfo = async (
  window: BrowserWindow,
  winInfo?: WindowInfo,
  animate?: boolean,
  windowPadding?: boolean,
): Promise<void> => {
  const windowInfo = winInfo || ((await StorageService.get('currentWindowInfo')) as WindowInfo | null);
  if (windowInfo) {
    const width = windowPadding ? windowInfo.width - 50 : windowInfo.width;
    const height = windowPadding ? windowInfo.height - 25 : windowInfo.height;
    const xPos = windowPadding ? windowInfo.xPosition + 25 : windowInfo.xPosition;
    const yPos = windowPadding ? windowInfo.yPosition + 25 : windowInfo.yPosition;
    window.setSize(width, height, animate);
    window.setPosition(xPos, yPos, animate);
  }
};

export const setGlobalShortcuts = (window: BrowserWindow, keybind: string, overlayMode: boolean): void => {
  const newScreenInfo = getScreenInfo();
  previousScreenInfo = previousScreenInfo ? previousScreenInfo : { ...newScreenInfo };

  globalShortcut.register(keybind ? keybind.replace(/\ /g, '') : 'CommandOrControl+Esc', (): void => {
    // check if screen size has changed - happens if user switches displays
    if (
      newScreenInfo.width !== previousScreenInfo!.width ||
      previousScreenInfo!.height !== previousScreenInfo!.height
    ) {
      previousScreenInfo = { ...newScreenInfo };
      window.setSize(newScreenInfo.width, newScreenInfo.height);
      window.reload();
    }
    overlayMode && toggleVisibility(window);
  });
};

export const setWindowListeners = (window: BrowserWindow): void => {
  // resize event
  window.on('resize', async () => {
    const windowInfo = getWindowInfo(window);
    await StorageService.set('currentWindowInfo', windowInfo);
  });
};

export const setWindowMode = (overlay: boolean, window: BrowserWindow): void => {
  const options = {
    visible: overlay,
    alwaysTop: overlay,
    fullScreen: !overlay,
    menu: false,
  };

  window.setFullScreenable(options.fullScreen);
  window.setAlwaysOnTop(options.alwaysTop, options.alwaysTop ? 'floating' : undefined);
  window.setVisibleOnAllWorkspaces(options.visible, {
    visibleOnFullScreen: options.visible,
  });
};

export const toggleVisibility = (window: BrowserWindow): void => {
  const visible = window.isVisible();
  if (visible) {
    return window.hide();
  }
  return window.show();
};

export const quit = (): void => {
  return app.quit();
};
