import { BrowserWindow, globalShortcut, remote, screen, shell } from 'electron';
import { StorageService } from './storage';
import { DefaultWindowBehaviour, IScreenInfo, IWindowInfo } from '../typings/d';
import { MenuService } from './menu';

let previousScreenInfo: IScreenInfo | null = null;

export const ElectronService = {
  /**
   * Fetches current screen info
   * @param useRemote - flag to user remote
   */
  getScreenInfo: (useRemote?: boolean): IScreenInfo => {
    const screenSize = (useRemote ? remote.screen : screen).getPrimaryDisplay().workAreaSize;
    return { width: screenSize.width, height: screenSize.height };
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
   * @param keybind - visibility keybind
   * @param overlayMode - overlay mode flag
   */
  setGlobalShortcuts: (window: BrowserWindow, keybind: string, overlayMode: boolean): void => {
    const newScreenInfo = ElectronService.getScreenInfo();
    previousScreenInfo = previousScreenInfo ? previousScreenInfo : { ...newScreenInfo };

    // register shortcuts
    globalShortcut.register(keybind.replace(/\ /g, '') || 'CommandOrControl+Esc', (): void => {
      // check if screen size has changed - happens if user switches displays
      if (newScreenInfo.width !== previousScreenInfo!.width || previousScreenInfo!.height !== previousScreenInfo!.height) {
        previousScreenInfo = { ...newScreenInfo };
        window.setSize(newScreenInfo.width, newScreenInfo.height);
        window.reload();
      }
      overlayMode && ElectronService.toggleVisibility(window);
    });
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
      await ElectronService.openHyperlink(url, 'external');
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
    window.setAlwaysOnTop(options.alwaysTop, options.alwaysTop ? 'torn-off-menu' : undefined);
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

  /**
   * Opens a child window
   * @param url - url
   */
  openWindow: (url: string): void => {
    // disable always on top for main window
    const mainWindow = remote.getCurrentWindow();
    const isAlwaysOnTop = mainWindow.isAlwaysOnTop();
    mainWindow.setAlwaysOnTop(false);

    // create child window
    let childWindow: BrowserWindow = new remote.BrowserWindow({
      width: 800,
      height: 600,
      modal: true,
      show: false,
      darkTheme: true,
      titleBarStyle: 'hidden',
      webPreferences: {
        nodeIntegration: false,
        webviewTag: true,
      },
    });

    // load the url and show the window
    childWindow.loadURL(url);
    childWindow.show();

    // clear child window and set parent to what it was
    childWindow.on('closed', () => {
      // @ts-ignore
      childWindow = null;
      mainWindow.setAlwaysOnTop(isAlwaysOnTop);
    });
  },

  /**
   * Opens hyperlink based on user chosen action
   * @param url - url to be opened
   * @param behaviour - default window behaviour
   */
  openHyperlink: async (url: string, behaviour: DefaultWindowBehaviour): Promise<boolean> => {
    let shouldRefresh = false;
    switch (behaviour) {
      case 'window':
        ElectronService.openWindow(url);
        break;
      case 'within':
        shouldRefresh = true;
        await MenuService.save(url);
        break;
      default:
        shell.openExternal(url);
    }
    return shouldRefresh;
  },
};
