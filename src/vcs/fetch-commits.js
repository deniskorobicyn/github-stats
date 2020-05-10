const util = require('util');
const exec = util.promisify(require('child_process').exec);
const moment = require('moment');

async function fetchCommits(folder) {
  try {
    const { stdout } = await exec('git rev-list "--pretty=format:%at&%aN&%aE" --all', {cwd: folder, maxBuffer: 1024 * 1024 * 4});

    if(stdout){
      return stdout.split("\n").filter(line => !line.startsWith('commit')).map(line => {
        const [timestamp, nickname, email] = line.split('&');

        return {
          time: moment.unix(timestamp).utc(),
          nickname,
          email
        }
      });
    }

  } catch(error) {
    // Silcense all errors for now, yes, it's bad, I neeed to figure out how to find repo being empty without commits
    return [];
  }
}

module.exports = fetchCommits;