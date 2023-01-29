import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { IsFullScreenState, WindowSetupState } from '../state';
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
    (...args: any[]) => {
      const type = args[0][0] as ChannelEvent;
      const value = args[0][1] as ChannelValue;

      if (type === 'window-setup-data') {
        setWindowSetup(value);
      }
    },
    [setWindowSetup],
  );

  useEffect(() => {
    window.electron.ipcRenderer.on('window-events', windowEvents);
    window.electron.ipcRenderer.on('window-setup', windowSetup);
  }, []);
};
