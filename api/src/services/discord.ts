import { config } from '../config';
import fetch from 'node-fetch';
import * as _ from 'lodash';

export const DiscordService = {
  /**
   * Save provided data.
   * @param msg - message to be sent
   * @param hook - discord web hook
   * @param skipSafety - allow running outside of production
   */
  message: async (msg: string, hook: string, skipSafety = false): Promise<void> => {
    if (config.env !== 'production' && !skipSafety) {
      return;
    }

    const body = { content: msg };
    await fetch(hook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  },

  /**
   * Formats an object into a code block
   * @param data - data object
   */
  format: (data: object): string => {
    let formatted = '';
    for (const entry of _.entries(data)) {
      formatted += `${entry[0]}: ${entry[1]}\n`;
    }
    return `\n\`\`\`${formatted}\`\`\``;
  },
};
