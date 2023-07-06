const fs = require('fs');

const RELEASE_NOTES_FILE = './release-notes.txt';
const VERSION = JSON.parse(fs.readFileSync('./app/package.json', 'utf-8')).version;

/**
 * Last Update: v2.0.2
 */
const NOTES = [
  'Updated processes to make releases much more frequent',
  'Added option to view the status of pending invites sent',
];

const body = NOTES.map((v) => `- ${v}\n`).join('');
const final = `:ship: Release \`v${VERSION}\` is now live - ***changes take effect on app restart*** :point_down:\n\`\`\`\n${body}\`\`\`\u200B`;
fs.writeFileSync(RELEASE_NOTES_FILE, final);
