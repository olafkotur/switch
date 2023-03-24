import fetch from 'node-fetch';

export const UtilService = {
  /**
   * Promised based delay.
   * @param ms - milliseconds to wait
   */
  delay: async (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), ms);
    });
  },

  /**
   * Validate an email address with RegEx.
   * @param value - email address
   */
  validateEmail: (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  },

  /**
   * Fetches a favicon from any given website, driven by google favicon service
   * @param url - target url
   */
  fetchUrlFavicon: async (url: string): Promise<string> => {
    const size = 256;
    const target = `https://www.google.com/s2/favicons?domain=${url}&sz=${size}`;
    const result = await fetch(target);
    return result.url;
  },
};
