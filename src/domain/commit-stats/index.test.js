const test = require('ava');
const moment = require('moment');
const { calculateRepoStats, mergeGlobalStats } = require('.');

const stabbedTimeA = moment.unix(1589048993).utc();
const stabbedTimeB = moment.unix(1589544444).utc();
const stabbedTimeC = moment.unix(1588048993).utc();
const email = 'test@example.com';
const name = 'denis';
const nameSecond = 'denis K';

const commits = [{
  time: stabbedTimeA,
  nickname: name,
  email
},
{
  time: stabbedTimeB,
  nickname: nameSecond,
  email
}];

const simpleRepoStats = {
  [email]: {
    nicknames: new Set([name, nameSecond]),
    firstCommitTime: stabbedTimeA,
    numberOfCommits: 2
  }
}

const otherRepoStats = {
  [email]: {
    nicknames: new Set([name]),
    firstCommitTime: stabbedTimeC,
    numberOfCommits: 5
  }
}



test('calculateRepoStats simple', t => {
  const res = calculateRepoStats(commits);
  t.deepEqual(res, simpleRepoStats);
});


test('mergeGlobalStats simple if default is empty', t => {
  const res = mergeGlobalStats(simpleRepoStats, {});
  t.deepEqual(res, simpleRepoStats);
});


test('mergeGlobalStats simple if default is different', t => {
  const res = mergeGlobalStats(simpleRepoStats, otherRepoStats);
  t.deepEqual(res, {
    [email]: {
      nicknames: new Set([name, nameSecond]),
      firstCommitTime: stabbedTimeC,
      numberOfCommits: 7
    }
  });
});
