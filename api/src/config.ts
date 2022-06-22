require('dotenv').config()

type Environment = 'production' | 'development' | 'local'

const env: Environment =
  process.env.NODE_ENV === 'production' ? 'production' : 'local'

export const config = {
  env,
  mongoUri:
    env === 'production'
      ? process.env.MONGO_URI || ''
      : 'mongodb://127.0.0.1:27017/',
  jwtSecret: process.env.JWT_SECRET || '',
  cryptoSalt: process.env.CRYPTO_SALT || '',
  port: process.env.PORT || '8080',
}
