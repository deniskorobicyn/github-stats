/**
 * @public
 * @param {object} commits
 */
function calculateRepoStats(commits) {
  let authors = {};

  for(const { time, nickname, email } of commits) {
    if(!authors[email]) {
      authors[email] = {
        nicknames: new Set(),
        numberOfCommits: 0,
        firstCommitTime: time
      }
    }

    if(authors[email].firstCommitTime > time) {
      authors[email].firstCommitTime = time;
    }

    authors[email].nicknames.add(nickname);
    authors[email].numberOfCommits++;
  }

  return authors;
}
module.exports.calculateRepoStats = calculateRepoStats;

/**
 *
 * @public
 * @param {object} repoStats
 * @param {object} global IT MUTATES THIS ARGUMENT BE AWARE
 */
function mergeGlobalStats(repoStats, global = {}){
  const globalStats = {...global};

  for(let userEmail of Object.keys(repoStats)) {
    if(!globalStats[userEmail]){
      globalStats[userEmail] = {...repoStats[userEmail]};
    } else {
      globalStats[userEmail].numberOfCommits += repoStats[userEmail].numberOfCommits;
      globalStats[userEmail].nicknames = new Set([...globalStats[userEmail].nicknames, ...repoStats[userEmail].nicknames]);

      if(globalStats[userEmail].firstCommitTime > repoStats[userEmail].firstCommitTime) {
        globalStats[userEmail].firstCommitTime = repoStats[userEmail].firstCommitTime;
      }
    }
  }

  return globalStats;
}
module.exports.mergeGlobalStats = mergeGlobalStats;