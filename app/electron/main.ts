import { app, BrowserWindow, Menu, Tray } from 'electron'
import storage from 'electron-json-storage'
import log from 'electron-log'
import { autoUpdater } from 'electron-updater'
import * as path from 'path'
import * as url from 'url'

log.info('App is starting...')

const DEVELOPMENT = process.env.NODE_ENV === 'development'
let mainWindow: BrowserWindow
let tray: Tray

// storage setup
const dataPath = storage.getDataPath()
storage.setDataPath(dataPath)

/**
 * Creates the main window
 */
const createMainWindow = async (): Promise<void> => {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 720,
    minHeight: 480,
    minWidth: 720,
    center: true,
    darkTheme: true,
    frame: false,
    titleBarStyle: 'default',
    transparent: true,
    backgroundColor: '#1F2225',
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      enableRemoteModule: true,
      devTools: DEVELOPMENT,
      plugins: true,
    },
  })

  app.setName('Switch')
  app.dock.hide()
  // setup tray items
  tray = new Tray(path.join(__dirname, 'tray@2x.png'))
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Toggle Show / Hide' },
    { type: 'separator' },
    { label: 'Reload', role: 'reload' },
    { label: 'Quit', role: 'quit' },
  ])
  tray.setContextMenu(contextMenu)

  // render main window
  if (DEVELOPMENT) {
    mainWindow.loadURL('http://localhost:4000')
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    )
  }

  mainWindow.on('closed', () => {
    // @ts-ignore
    mainWindow = null
  })
}

/**
 * Sends a status message to the main window
 * @param status - message to be sent
 * @param window - target browser window
 */
const sendStatusToWindow = (status: string): void => {
  mainWindow.webContents.send('message', status)
}

// launch window
app.on('ready', async () => {
  await createMainWindow()
  await autoUpdater.checkForUpdates()
})
app.on('window-all-closed', () => {
  app.quit()
})
app.allowRendererProcessReuse = true
