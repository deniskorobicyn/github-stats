/* eslint-disable no-undef */
const path = require('path');
require('dotenv').config();

module.exports = {
  baseGithubDir: path.join(__dirname, '../temp'),
  baseOutputDir: path.join(__dirname, '../result'),
  credentials: {
      githubToken: process.env.GITHUB_TOKEN
  },
  orgName: process.env.ORG_NAME
};