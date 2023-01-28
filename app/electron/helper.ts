import { app, BrowserWindow, globalShortcut, screen } from 'electron';
import { StorageService } from './storage';

let previousScreenInfo: IScreenInfo | null = null;

type IScreenInfo = any;
type IWindowInfo = any;

export const ElectronService = {
  /**
   * Fetches current screen info.
   */
  getScreenInfo: (): IScreenInfo => {
    const screenSize = screen.getPrimaryDisplay().workAreaSize;
    return { width: screenSize.width, height: screenSize.height };
  },

  /**
   * Fetches current window info (before remote window intialisation)
   */
  getWindowInfo: (window: BrowserWindow): IWindowInfo => {
    const size = window.getSize();
    const position = window.getPosition();
    return {
      width: size[0],
      height: size[1],
      xPosition: position[0],
      yPosition: position[1],
    };
  },

  /**
   * Sets window size and position.
   * @param window - browser window
   * @param winInfo - window info
   * @param animate - true to animate repositioning
   * @param windowPadding - gives extra padding around the sides
   */
  setWindowInfo: async (
    window: BrowserWindow,
    winInfo?: IWindowInfo,
    animate?: boolean,
    windowPadding?: boolean,
  ): Promise<void> => {
    const windowInfo = winInfo || ((await StorageService.get('currentWindowInfo')) as IWindowInfo | null);
    if (windowInfo) {
      const width = windowPadding ? windowInfo.width - 50 : windowInfo.width;
      const height = windowPadding ? windowInfo.height - 25 : windowInfo.height;
      const xPos = windowPadding ? windowInfo.xPosition + 25 : windowInfo.xPosition;
      const yPos = windowPadding ? windowInfo.yPosition + 25 : windowInfo.yPosition;
      window.setSize(width, height, animate);
      window.setPosition(xPos, yPos, animate);
    }
  },

  /**
   * Set global shortut listeners.
   * @param window - browser window
   * @param keybind - visibility keybind
   * @param overlayMode - overlay mode flag
   */
  setGlobalShortcuts: (window: BrowserWindow, keybind: string, overlayMode: boolean): void => {
    const newScreenInfo = ElectronService.getScreenInfo();
    previousScreenInfo = previousScreenInfo ? previousScreenInfo : { ...newScreenInfo };

    // register shortcuts
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
      overlayMode && ElectronService.toggleVisibility(window);
    });
  },

  /**
   * Set window listener events.
   * @param window - browser window
   */
  setWindowListeners: (window: BrowserWindow): void => {
    // resize event
    window.on('resize', async () => {
      const windowInfo = ElectronService.getWindowInfo(window);
      await StorageService.set('currentWindowInfo', windowInfo);
    });
  },

  /**
   * Sets the window mode.
   * @param overlay - true to allow application to be seen over other windows, including full screen
   */
  setWindowMode: (overlay: boolean, window: BrowserWindow): void => {
    const options = {
      visible: true,
      fullScreen: false,
      alwaysTop: true,
      menu: false,
    }; // assume overlay
    if (!overlay) {
      options.visible = false;
      options.fullScreen = true;
      options.alwaysTop = false;
    }
    window.setVisibleOnAllWorkspaces(options.visible);
    window.setFullScreenable(options.fullScreen);
    window.setAlwaysOnTop(options.alwaysTop, options.alwaysTop ? 'torn-off-menu' : undefined);
  },

  /**
   * Toggle the visibility of the window.
   * @param window - browser window
   */
  toggleVisibility: (window: BrowserWindow): void => {
    const visible = window.isVisible();
    if (visible) {
      return window.hide();
    }
    return window.show();
  },

  /**
   * Quits the application (used to apply updates)
   */
  quit: (): void => {
    return app.quit();
  },
};
