const { Octokit } = require("@octokit/rest");
const config = require('../../config');

let currentInstance;
  
class VCS {
    static get current(){
        currentInstance = currentInstance || new VCS();
        return currentInstance;
    }

    constructor() {
        this.octokit = new Octokit({auth: config.credentials.githubToken});
    }
}

module.exports = VCS.current;