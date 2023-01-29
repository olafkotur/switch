require('dotenv').config({ path: '../../.env' });

const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return console.error('This application only supports macOS');
  }

  const appName = context.packager.appInfo.productFilename;

  return await notarize({
    appBundleId: 'com.electron.switch',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEPASS,
  });
};
