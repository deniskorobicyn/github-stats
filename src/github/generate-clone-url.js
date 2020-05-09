const { GITHUB_TOKEN } = require('./consts');
function generateCloneUrl(repo) {
  return repo.clone_url.replace('https://', `https://${GITHUB_TOKEN}@`);
}
module.exports = generateCloneUrl;