import crypto from 'crypto';
import moment from 'moment';
import { remote } from 'electron';
import { IScreenInfo, IWindowInfo } from '../typings/d';

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

  getWindowInfo: (): IWindowInfo => {
    const size = remote.getCurrentWindow().getSize();
    const position = remote.getCurrentWindow().getPosition();
    return { width: size[0], height: size[1], xPosition: position[0], yPosition: position[1] };
  },

  getScreenSize: (): IScreenInfo => {
    const screen = remote.screen.getPrimaryDisplay().workAreaSize;
    return { width: screen.width - 50, height: screen.height - 25 };
  },

  getUserAgent: (): string => {
    const userAgent = navigator.userAgent;
    const versions = {
      chromium: '87.0.4280.67',
      safari: '537.36',
    };

    // fall back in case matching fails
    let fragments = ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_16_0) AppleWebKit/537.36 (KHTML, like Gecko) '];
    if (userAgent.includes('switch/')) {
      fragments = userAgent.split(/switch\/\d+([^\s]+)/g);
    } else if (userAgent.includes('Chrome/')) {
      fragments = userAgent.split(/Chrome\/\d+([^\s]+)/g);
    }
    const newUserAgent = `${fragments[0]}Chrome/${versions.chromium} Safari/${versions.safari}`;
    return newUserAgent;
  },
};
