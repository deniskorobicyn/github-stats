const vcs = require('./instance');


async function fetchRepos(org) {
  const octokit = vcs.octokit;
  const repos = await octokit.paginate(octokit.repos.listForOrg, {org: org, type: "sources"});
  return repos;
}

module.exports = fetchRepos;