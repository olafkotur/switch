import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Channel } from '../src/typings';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channel, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channel, func: (...args: any[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channel, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
