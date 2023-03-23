// @ts-expect-error
import Package from '../package.json';

export const APP_VERSION = Package?.version ?? '0.0.0';

export const IS_PRODUCTION = process.env.NODE_ENV !== 'development';

export const VISIBILITY_KEYBIND = 'Command + Esc';

export const API_BASE_URL = IS_PRODUCTION ? 'https://api-switch.up.railway.app' : 'http://localhost:8080';
export const AUTO_UPDATE_SOURCE = 'https://raw.githubusercontent.com/olafkotur/switch-releases/main/updates.json';
export const DEFAULT_ERROR_MESSAGE = 'Unknown error occurred, a developer has been notified.';

export const SIDE_BAR_WIDTH = 67;
export const DEFAULT_ICON_SIZE = 18;
export const DEFAULT_ICON_OPACITY = 0.75;
export const SEARCH_BAR_PLACEHOLDER = 'https://notion.so';

export const INITIALISE_TIMEOUT_MS = 250;
export const APP_TIMEOUT_MS = 500;
export const REQUEST_TIMEOUT_MS = 15000;

export const PRESET_CONFIG = [
  { width: '100%', value: 1 },
  { width: '75%', value: 0.75 },
  { width: '50%', value: 0.5 },
];

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDBMyFWpFWc9Ws79K_DhoXQOutgsZT-vCg',
  authDomain: 'switch-3dd9a.firebaseapp.com',
  projectId: 'switch-3dd9a',
  storageBucket: 'switch-3dd9a.appspot.com',
  messagingSenderId: '605914968202',
  appId: '1:605914968202:web:3d5a6b07c920e351bffd73',
  measurementId: 'G-171CHTHC36',
};
