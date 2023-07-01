require('dotenv').config({ path: `${__dirname}/../../.env` });

const { notarize } = require('@electron/notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return console.error('This application only supports macOS');
  }

  const { APPLE_ID, APPLE_PASS, APPLE_TEAM_ID } = process.env;
  if (!APPLE_ID || !APPLE_PASS || !APPLE_TEAM_ID) {
    return console.error('Apple authentication details are missing');
  }

  const appName = context.packager.appInfo.productFilename;

  return await notarize({
    tool: 'notarytool',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_PASS,
    teamId: process.env.APPLE_TEAM_ID,
  });
};
