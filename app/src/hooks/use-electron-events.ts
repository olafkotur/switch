import { useCallback, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { AppUpdatesState, IsFullScreenState, WindowSetupState } from '../state';
import { Channel, ChannelEvent, ChannelValue } from '../typings';

export const useSendMessage = (channel: Channel) => {
  return useCallback(
    ({ name, value }: { name: ChannelEvent; value: any }) => {
      window.electron.ipcRenderer.sendMessage(channel, [name, value]);
    },
    [channel],
  );
};

export const useElectronListeners = () => {
  const [appUpdates, setAppUpdates] = useRecoilState(AppUpdatesState);
  const setIsFullScreen = useSetRecoilState(IsFullScreenState);
  const setWindowSetup = useSetRecoilState(WindowSetupState);

  const windowEvents = useCallback(
    (...args: any[]) => {
      const type = args[0][0] as ChannelEvent;
      const value = args[0][1] as ChannelValue;

      if (type === 'full-screen') {
        setIsFullScreen(value);
      }
    },
    [setIsFullScreen],
  );

  const windowSetup = useCallback(
    async (...args: any[]) => {
      const type = args[0][0] as ChannelEvent;
      const value = args[0][1] as ChannelValue;

      if (type === 'window-setup-data') {
        setWindowSetup(value);
      }
    },
    [setWindowSetup],
  );

  const _appUpdates = useCallback(
    (...args: any) => {
      const type = args[0][0] as ChannelEvent;
      const value = args[0][1] as ChannelValue;

      if (type === 'update-available') {
        setAppUpdates({ ...appUpdates, isUpdateAvailable: value, isCheckingForUpdate: false });
      }

      if (type === 'update-downloading') {
        setAppUpdates({ ...appUpdates, isUpdateDownloading: true });
      }

      if (type === 'update-downloaded') {
        setAppUpdates({ ...appUpdates, isUpdateDownloaded: true });
      }
    },
    [appUpdates, setAppUpdates],
  );

  useEffect(() => {
    window.electron.ipcRenderer.on('window-events', windowEvents);
    window.electron.ipcRenderer.on('window-setup', windowSetup);
    window.electron.ipcRenderer.on('app-updates', _appUpdates);
  }, []);
};
