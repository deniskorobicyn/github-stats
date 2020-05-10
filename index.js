const path = require('path');
const fs = require('fs');

const config = require('./config');
const { fetchRepos, generateCloneUrl } = require('./src/github');
const { fetchCommits, cloneRepo } = require('./src/vcs');
const { calculateRepoStats, mergeGlobalStats} = require('./src/domain/commit-stats');
const { writeStatsToFile } = require('./src/utils');

// eslint-disable-next-line no-undef
(require.main === module) && (main().catch(handleError));

async function main() {
  
  const org = config.orgName;
  
  const repos = await fetchRepos(org);
  let globalStats = {};

  await Promise.all(repos.map(async (repo) => {
    const folder = path.join(config.baseGithubDir, repo.name);
    if (!fs.existsSync(folder)) {
      await cloneRepo(generateCloneUrl(repo), folder);
    }

    const commits = await fetchCommits(folder);

    const repoStats = calculateRepoStats(commits);
    globalStats = mergeGlobalStats(repoStats, globalStats);
  }));

  writeStatsToFile('output.json', globalStats);
}

async function handleError(error) {
  console.log(error);
  // eslint-disable-next-line no-undef
  process.exit(1);
}