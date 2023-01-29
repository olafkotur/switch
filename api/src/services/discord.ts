import { entries } from 'lodash';
import fetch from 'node-fetch';
import { ENVIORNMENT } from '../const';

export const DiscordService = {
  /**
   * Save provided data.
   * @param msg - message to be sent
   * @param hook - discord web hook
   * @param isProductionOnly - only send messages in production
   */
  message: async (msg: string, hook: string, isProductionOnly = true): Promise<void> => {
    if (ENVIORNMENT !== 'production' && isProductionOnly) {
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
    for (const entry of entries(data)) {
      formatted += `${entry[0]}: ${entry[1]}\n`;
    }
    return `\n\`\`\`${formatted}\`\`\``;
  },
};
