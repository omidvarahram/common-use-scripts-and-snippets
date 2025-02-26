module.exports = {
  repositoryUrl: 'https://github.aus.thenational.com/NAB-X/xnf-module.git',
  branches: ['master'],
  plugins: [
    '@semantic-release/commit-analyzer',
    {
      preset: 'angular',
    },
    '@semantic-release/release-notes-generator',
    {
      '@semantic-release/exec': {
        successCmd: 'echo ${nextRelease.version} > .next-version.txt',
      },
    },
    {
      '@semantic-release/changelog': {
        changelogFile: 'CHANGELOG.md',
      },
    },
    {
      '@semantic-release/npm': {
        npmPublish: false, // Set to false if you are using a private registry or only want version updates
        pkgRoot: '.', 
        tarballDir: '.',
        verifyConditions: ['@semantic-release/npm'],
      },
    },
    {
      '@semantic-release/git': {
        message: 'chore(release): v${nextRelease.version}',
        assets: ['CHANGELOG.md', 'package.json'],
      },
    },
    '@semantic-release/github',
  ],
  prepare: [
    {
      path: '@semantic-release/npm',
      env: {
        YARN_IGNORE_PEER_DEPENDENCIES: 'true',
      },
    },
  ],
};