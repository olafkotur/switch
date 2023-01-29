import { app, BrowserWindow, globalShortcut, Menu, screen, Tray } from 'electron';
import storage from 'electron-json-storage';
import path from 'path';
import { sendWindowEvents, receiveWindowSetup, receiveWindowPresets } from './events';
import { ScreenProperties, ElectronStorageKey, WindowProperties } from '../src/typings';

let previousScreenProperties: ScreenProperties | null = null;

export const getStorage = async <T>(key: ElectronStorageKey): Promise<T | null> => {
  return await new Promise((resolve, reject) => {
    storage.get(key, (_error, data) => {
      if (data) {
        resolve(data as T);
      }
      reject(null);
    });
  });
};

export const setStorage = async <T>(key: ElectronStorageKey, data: T): Promise<boolean> => {
  return await new Promise((resolve, reject) => {
    storage.set(key, data as object, (error) => {
      if (error) {
        reject(false);
      }
      resolve(true);
    });
  });
};

export const setupWindowEvents = (window: BrowserWindow) => {
  sendWindowEvents(window);
  receiveWindowSetup(window);
  receiveWindowPresets(window);
};

export const getWindowProperties = (window: BrowserWindow): WindowProperties => {
  const size = window.getSize();
  const position = window.getPosition();
  return {
    width: size[0],
    height: size[1],
    xPosition: position[0],
    yPosition: position[1],
  };
};

export const getScreenProperties = (): ScreenProperties => {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  return { width: screenSize.width, height: screenSize.height };
};

export const setWindowProperties = (window: BrowserWindow, properties: WindowProperties, animate: boolean): void => {
  const width = properties.width;
  const height = properties.height;
  const xPos = properties.xPosition;
  const yPos = properties.yPosition;

  window.setSize(width, height, animate);
  window.setPosition(xPos, yPos, animate);
};

export const setGlobalShortcuts = (window: BrowserWindow, keybind: string, overlayMode: boolean): void => {
  const screenProperties = getScreenProperties();
  previousScreenProperties = previousScreenProperties ?? { ...screenProperties };

  globalShortcut.register(keybind ? keybind.replace(/\ /g, '') : 'CommandOrControl+Esc', (): void => {
    // check if screen size has changed - happens if user switches displays
    if (
      screenProperties.width !== previousScreenProperties!.width ||
      previousScreenProperties!.height !== previousScreenProperties!.height
    ) {
      previousScreenProperties = { ...screenProperties };
      window.setSize(screenProperties.width, screenProperties.height);
      window.reload();
    }
    overlayMode && toggleWindowIsVisible(window);
  });
};

export const setOverlayMode = (window: BrowserWindow, overlayMode: boolean): void => {
  const options = {
    visible: overlayMode,
    alwaysTop: overlayMode,
    fullScreen: !overlayMode,
    minimise: !overlayMode,
    menu: false,
  };

  overlayMode && app.dock.hide();
  window.setMinimizable(options.minimise);
  window.setFullScreenable(options.fullScreen);
  window.setAlwaysOnTop(options.alwaysTop, options.alwaysTop ? 'floating' : undefined);
  window.setVisibleOnAllWorkspaces(options.visible, {
    visibleOnFullScreen: options.visible,
  });
};

export const setupTrayConfiguration = (mainWindow: BrowserWindow, overlayMode: boolean) => {
  const tray = new Tray(path.join(__dirname, 'tray@2x.png'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Toggle Show / Hide',
      visible: overlayMode,
      click: () => toggleWindowIsVisible(mainWindow),
    },
    { type: 'separator', visible: overlayMode },
    { label: 'Reload', role: 'reload' },
    { label: 'Quit', role: 'quit' },
  ]);
  tray.setContextMenu(contextMenu);
};

export const toggleWindowIsVisible = (window: BrowserWindow): void => {
  const visible = window.isVisible();
  if (visible) {
    return window.hide();
  }
  return window.show();
};

export const quitApplication = (): void => {
  return app.quit();
};
