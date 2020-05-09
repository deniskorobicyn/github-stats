
require('dotenv').config();

const path = require('path');
const fs = require('fs');
const util = require('util');

const { fetchRepos, generateCloneUrl } = require('./src/github');
const { fetchCommits, cloneRepo } = require('./src/vcs');
const { calculateRepoStats, mergeGlobalStats} = require('./src/domain/stats');

// eslint-disable-next-line no-undef
(require.main === module) && (main().catch(handleError));

async function main() {
  console.log('start');
  const repos = await fetchRepos('devsbb');
  let globalStats = {};
  const baseFolder = path.resolve('./temp');

  await Promise.all(repos.map(async (repo) => {
    const folder = path.join(baseFolder, repo.name);
    if (!fs.existsSync(folder)) {
      await cloneRepo(generateCloneUrl(repo), folder);
    }

    const gitPath = path.join(folder, '.git');
    if (fs.existsSync(gitPath)) {
      const commits = await fetchCommits(folder);

      const repoStats = calculateRepoStats(commits);
      globalStats = mergeGlobalStats(repoStats, globalStats);
    }
  }));

  const dataFile = path.join(baseFolder, 'output.json');
  fs.writeFileSync(dataFile, util.inspect(globalStats) );
}

async function handleError(error) {
  console.log(error);
  // eslint-disable-next-line no-undef
  process.exit(1);
}