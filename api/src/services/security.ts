import crypto from 'crypto-js';
import { config } from '../config';
import jwt from 'jsonwebtoken';
import { IAuth, JwtResponse } from '../typings/data';

export const SecurityService = {
  /**
   * Performs encryption on an input string.
   * @param input - input string
   */
  encrypt: (input: string): string => {
    return crypto.AES.encrypt(input, config.cryptoSalt).toString();
  },

  /**
   * Performs decryption on an input string.
   * @param input - input string
   */
  decrypt: (input: string): string => {
    return crypto.AES.decrypt(input, config.cryptoSalt).toString(crypto.enc.Utf8);
  },

  /**
   * Performs a hash on an input string.
   * @param input - input string
   */
  hash: (input: string): string => {
    return crypto.SHA256(input).toString();
  },

  /**
   * Performs a JWT encryption in order to create a token.
   * @param email - email of the user
   * @param password - password of the user
   */
  generateToken: (email: string, password: string, model: 'access' | 'refresh'): string => {
    const expiresIn = model === 'access' ? '2h' : '7d';
    return jwt.sign({ email, password, model }, config.jwtSecret, { expiresIn });
  },

  /**
   * Refreshes a JWT token if the token is valid
   * @param token - token to be verified
   */
  refreshToken: async (token: string): Promise<object | null> => {
    return await new Promise((resolve) => {
      jwt.verify(token, config.jwtSecret, (error, decoded) => {
        if (!decoded || decoded.model !== 'refresh' || error) {
          return resolve(null);
        }
        // clean payload and generate a new token
        const payload: IAuth = { email: decoded.email, password: decoded.password };
        const tokens = {
          accessToken: SecurityService.generateToken(payload.email, payload.password, 'access'),
          refreshToken: SecurityService.generateToken(payload.email, payload.password, 'refresh'),
        };
        resolve(tokens);
      });
    });
  },

  /**
   * Verifies whether given JWT token is valid.
   * @param accessToken - token to be verified
   */
  verifyToken: async (accessToken: string): Promise<JwtResponse> => {
    return await new Promise((resolve) => {
      jwt.verify(accessToken, config.jwtSecret, (error, decoded) => {
        const response = { data: decoded as IAuth };
        if (error) {
          return resolve({ ...response, error: error.name });
        }
        resolve(response);
      });
    });
  },

  /**
   * Checks whether password is valid based on its strength.
   * @param password - password to be verified
   */
  validatePassword: (password: string): boolean => {
    return new RegExp('(?=^.{8,}$)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$').test(password);
  },
};
