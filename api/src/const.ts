require('dotenv').config({ path: `${__dirname}/../../.env` });

type Environment = 'production' | 'development';

export const ENVIORNMENT: Environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

export const MONGO_URL = ENVIORNMENT === 'production' ? process.env.MONGO_URL ?? '' : 'mongodb://127.0.0.1:27017/';
export const MONGO_NAME = ENVIORNMENT === 'production' ? 'data' : 'switch';
export const PORT = process.env.PORT || 8080;

export const CRYPTO_SALT = process.env.CRYPTO_SALT || '';
export const JWT_SECRET = process.env.JWT_SECRET || '';
export const NO_VERIFY_URLS = ['/release', '/user/login', '/user/refresh', '/user/create'];

export const SEND_EMAILS = ENVIORNMENT === 'production';
export const EMAIL_USERNAME = process.env.EMAIL_USERNAME ?? '';
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD ?? '';

export const INVITE_EMAIL = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Switch Invitation</title></head><body><p style="margin-bottom:16px;">Hello,</p><p style="margin-bottom:16px;">You have been invited to join the private beta of Switch, a productivity tool for MacOS.</p><p style="margin-bottom:16px;">To download the app, follow the instructions <a href="https://app.switchapp.dev" target="_blank">here</a> or click the button at the end of this email.</p><p style="margin-bottom:16px;">We value your participation and feedback during this exclusive beta phase. Join our Discord server to share your insights, suggestions, or any issues you encounter with our team. Your input will play a crucial role in shaping the future of Switch.</p><p style="margin-bottom:16px;">Thank you for joining us on this exciting journey! We can't wait to hear your thoughts about Switch. If you have any questions or need assistance, reach out to our support team on Discord.</p><p style="margin-bottom:16px;">Best regards,</p><p style="margin-bottom:16px;">Switch</p><div style="display:flex;justify-content:center;margin-top:20px;margin:0 auto"><a class="button" href="https://discord.gg/5uHgnAZqUA" target="_blank" style="margin:5px;display:inline-block;background-color:#495fd1;color:#fff;padding:10px 20px;border-radius:4px;text-decoration:none;cursor:pointer;box-sizing:border-box;text-align:center;">Join our Discord</a><a class="button" href="https://switchapp.dev" target="_blank" style="margin:5px;display:inline-block;background-color:#495fd1;color:#fff;padding:10px 20px;border-radius:4px;text-decoration:none;cursor:pointer;box-sizing:border-box;text-align:center;">Download on MacOS</a></div></body></html>`;
