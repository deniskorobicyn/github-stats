const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function cloneRepo(cloneUrl, folder) {
  fs.mkdirSync(folder);
  await exec(`git clone ${cloneUrl} ${folder}`);
}

module.exports = cloneRepo;