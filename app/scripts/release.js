const fs = require('fs');
const path = require('path');

const packageJsonPath = '../package.json';
const version = require(packageJsonPath).version;

const releaseDirectory = '../release';
const releaseJsonPath = path.join(releaseDirectory, 'release.json');
const updatesJsonPath = path.join(releaseDirectory, 'updates.json');

const releaseJson = {
  url: `https://github.com/olafkotur/switch-releases/releases/download/v${version}/Switch-${version}-mac.zip`,
  name: '',
  notes: '',
  pub_date: new Date().toISOString(),
};

const updatesJson = {
  'darwin-x64-prod': {
    readme: `Release ${version}`,
    update: 'https://raw.githubusercontent.com/olafkotur/switch-releases/master/release.json',
    install: `https://github.com/olafkotur/switch-releases/releases/download/v${version}/Switch-${version}.dmg`,
    version,
  },
};

fs.mkdirSync(releaseDirectory, { recursive: true });
fs.writeFileSync(releaseJsonPath, JSON.stringify(releaseJson, null, 2));
fs.writeFileSync(updatesJsonPath, JSON.stringify(updatesJson, null, 2));
