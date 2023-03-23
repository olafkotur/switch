import crypto from 'crypto-js';
import jwt from 'jsonwebtoken';
import { CRYPTO_SALT, JWT_SECRET } from '../const';
import { JwtAuthData, JwtRefreshResponse, JwtResponse } from '../typings';

export const SecurityService = {
  /**
   * Performs encryption on an input string.
   * @param input - input string
   */
  encrypt: (input: string): string => {
    return crypto.AES.encrypt(input, CRYPTO_SALT).toString();
  },

  /**
   * Performs decryption on an input string.
   * @param input - input string
   */
  decrypt: (input: string): string => {
    return crypto.AES.decrypt(input, CRYPTO_SALT).toString(crypto.enc.Utf8);
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
   * @param email - user name
   * @param password - password of the user
   */
  generateToken: (email: string, password: string, model: 'access' | 'refresh'): string => {
    const expiresIn = model === 'access' ? '2h' : '7d';
    return jwt.sign({ email, password, model }, JWT_SECRET, {
      expiresIn,
    });
  },

  /**
   * Refreshes a JWT token if the token is valid
   * @param token - token to be verified
   */
  refreshToken: async (token: string): Promise<JwtRefreshResponse | null> => {
    return await new Promise((resolve) => {
      jwt.verify(token, JWT_SECRET, (error, decode) => {
        const decoded = decode as jwt.JwtPayload;
        if (!decoded || decoded.model !== 'refresh' || error) {
          return resolve(null);
        }
        // clean payload and generate a new token
        const payload: JwtAuthData = {
          email: decoded.email,
          password: decoded.password,
        };
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
      jwt.verify(accessToken, JWT_SECRET, (error, decoded) => {
        const response = { data: decoded as JwtAuthData };
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
