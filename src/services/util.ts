import crypto from 'crypto';
import moment from 'moment';

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
};
