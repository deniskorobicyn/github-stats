const { spawn } = require("child_process");
const fs = require('fs');

function cloneRepo(cloneUrl, folder) {
  return new Promise( (resolve, reject) => {
    fs.mkdirSync(folder);
    const cloneProcess = spawn("git", ['clone', cloneUrl, folder]);

    cloneProcess.on('close', async code => {
      if(code === 0) {
        return resolve();
      }

      reject(`failure code - ${code}`);
    });

    cloneProcess.on('error', error => {
      return reject(error);
    });
  })
}

module.exports = cloneRepo;