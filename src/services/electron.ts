import { BrowserWindow, globalShortcut, remote, screen } from 'electron';
import { StorageService } from './storage';
import { IScreenInfo, IWindowInfo } from '../typings/d';
import open from 'open';

export const ElectronService = {
  /**
   * Fetches current screen info (before remote window intialisation)
   */
  getScreenInfo: (): IScreenInfo => {
    const screenSize = screen.getPrimaryDisplay().workAreaSize;
    return { width: screenSize.width - 50, height: screenSize.height - 25 };
  },

  /**
   * Fetches current window info (before remote window intialisation)
   */
  getWindowInfo: (window: BrowserWindow): IWindowInfo => {
    const size = window.getSize();
    const position = window.getPosition();
    return { width: size[0], height: size[1], xPosition: position[0], yPosition: position[1] };
  },

  /**
   * Sets window size and position
   * @param win - browser window
   * @param winInfo - window info
   * @param animate - true to animate repositioning
   */
  setWindowInfo: async (win?: BrowserWindow, winInfo?: IWindowInfo, animate?: boolean): Promise<void> => {
    const window = win || remote.getCurrentWindow();
    const windowInfo = winInfo || await StorageService.get('currentWindowInfo') as IWindowInfo | null;
    if (windowInfo) {
      window.setSize(windowInfo.width, windowInfo.height, animate);
      window.setPosition(windowInfo.xPosition, windowInfo.yPosition, animate);
    }
  },

  /**
   * Set global shortut listeners
   * @param window - browser window
   * @param screenInfo - screen info
   */
  setGlobalShortcuts: (window: BrowserWindow, screenInfo: IScreenInfo): IScreenInfo => {
    let newScreenSize = { ...screenInfo };
    globalShortcut.register('CommandOrControl+Esc', (): void => {
      // check if screen size has changed - happens if user switches displays
      newScreenSize = { ...ElectronService.getScreenInfo() };
      if (newScreenSize.width !== screenInfo.width || screenInfo.height !== screenInfo.height) {
        window.setSize(screenInfo.width, screenInfo.height);
        window.reload();
      }
      ElectronService.toggleVisibility(window);
    });
    return newScreenSize;
  },

  /**
   * Set window listener events
   * @param window - browser window
   */
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
  },

  /**
   * Sets the window mode
   * @param overlay - true to allow application to be seen over other windows, including full screen
   * @param win - browser window
   */
  setWindowMode: (overlay: boolean, win?: BrowserWindow): void => {
    const window = win || remote.getCurrentWindow();
    const options = { visible: true, fullScreen: false, alwaysTop: true, menu: false }; // assume overlay
    if (!overlay) {
      options.visible = false;
      options.fullScreen = true;
      options.alwaysTop = false;
    }
    window.setVisibleOnAllWorkspaces(options.visible);
    window.setFullScreenable(options.fullScreen);
    window.setAlwaysOnTop(options.alwaysTop, options.alwaysTop ? 'screen-saver' : undefined);
  },

  /**
   * Toggle the visibility of the window
   * @param win - browser window
   */
  toggleVisibility: (win?: BrowserWindow): void => {
    const window = win || remote.getCurrentWindow();
    const visible = window.isVisible();
    if (visible) {
      return window.hide();
    }
    return window.show();
  },
};
