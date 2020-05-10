### Github stats

Console line utility which allows you to get basic information about all contributors in your Github organization.


### Supported features

- Simple inspect output
- Number of commits
- First commit date


### Future scope

- Merge stats with real user profiles based on email
- Web interface


### Development

### Installation

1. Base setup
```
git clone git@github.com:deniskorobicyn/github-stats.git
cd github-stats
npm install
```

2. Credentials
create file `.env` and put there your github token like so:

```
GITHUB_TOKEN=****
```

You can check [this](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) article on how to generate token.

#### Running stats

```
npm start
```

With docker

```
docker-compose up
```

or with [DIP](https://github.com/bibendi/dip)

```
dip run
```