const fs = require('fs');
const path = require('path');
const util = require('util');
const cofig = require('../../config');

function writeStatsToFile(filename, stats) {
  const dataFile = path.join(cofig.baseOutputDir, filename);
  const statsCopy = {...stats};
  for(const nick of Object.keys(statsCopy)) {
    statsCopy[nick] = {...stats[nick], nicknames: [...stats[nick].nicknames]};
  }
  fs.writeFileSync(dataFile, util.inspect(JSON.stringify(statsCopy)));  
}
module.exports.writeStatsToFile = writeStatsToFile;