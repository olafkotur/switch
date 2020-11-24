import crypto from 'crypto';
import moment from 'moment';
import { remote } from 'electron';
import { IWindowSize } from '../typings/d';

export const UtilService = {
  error: (message?: string) => {
    alert(message || 'Something went wrong, please try again');
  },

  generateId: (salt: string): string => {
    const input = `${salt}-${moment().milliseconds()}-${Math.random()}`;
    const algorithm = crypto.createHash('sha256');
    const hash = algorithm.update(input).digest('hex').toString();
    return hash;
  },

  getWindowSize: (): IWindowSize => {
    const window = remote.getCurrentWindow().getSize();
    return { width: window[0], height: window[1] };
  },

  getScreenSize: (): IWindowSize => {
    const screen = remote.screen.getPrimaryDisplay().workAreaSize;
    return { width: screen.width - 50, height: screen.height - 25 };
  },
};
