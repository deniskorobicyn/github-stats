const { spawn } = require("child_process");
const moment = require('moment');

function fetchCommits(folder) {
  return new Promise( (resolve, reject) => {
    const gitProc = spawn('git', ['rev-list', '--pretty=format:%at$%aN$%aE', 'HEAD'], {cwd: folder});

    let res = "";
    gitProc.stdout.on('data', data => {
      res += data;
    });

    gitProc.on('close', code => {
      if(code === 0) {
        const commits = res.split("\n").filter(line => !line.startsWith('commit')).map(line => {
          const [timestamp, nickname, email] = line.split('$');

          return {
            time: moment.unix(timestamp).utc(),
            nickname,
            email
          }
        });

        return resolve(commits);
      }

      // return empty array in case it's empty repo
      if(code === 128) {
        return resolve([])
      }

      reject(code);
    });

    gitProc.on('error', error => reject(error));
  });
}

module.exports = fetchCommits;