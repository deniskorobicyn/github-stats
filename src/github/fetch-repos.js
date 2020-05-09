const { Octokit } = require("@octokit/rest");
// eslint-disable-next-line no-undef
const { GITHUB_TOKEN } = require('./consts');

async function fetchRepos(org) {
  const octokit = new Octokit({auth: GITHUB_TOKEN});
  const repos = await octokit.paginate(octokit.repos.listForOrg, {org: org, type: "sources"});
  return repos;
}

module.exports = fetchRepos;