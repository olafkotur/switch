require('dotenv').config({ path: `${__dirname}/../../.env` });

type Environment = 'production' | 'development';

export const ENVIORNMENT: Environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';
export const MONGO_URI = ENVIORNMENT === 'production' ? process.env.MONGO_URI || '' : 'mongodb://127.0.0.1:27017/';
export const MONGO_NAME = ENVIORNMENT === 'production' ? 'data' : 'switch';
export const PORT = process.env.PORT || 8080;
export const CRYPTO_SALT = process.env.CRYPTO_SALT || '';
export const JWT_SECRET = process.env.JWT_SECRET || '';
export const NO_VERIFY_URLS = ['/user/login', '/user/refresh', '/user/create'];
