export default {
  repositoryUrl: 'https://github.aus.thenational.com/NAB-X/nui-themes.git',
  branches: ['master'],
  extends: 'semantic-release-monorepo',
  plugins: [
    '@semantic-release/commit-analyzer',
    {
      preset: 'angular'
    },
    '@semantic-release/release-notes-generator',
    {
      '@semantic-release/exec': {
        successCmd: 'echo ${nextRelease.version} > .next-version.txt'
      }
    },
    {
      '@semantic-release/changelog': {
        changelogFile: 'CHANGELOG.md'
      }
    },
    '@semantic-release/npm',
    {
      '@semantic-release/git': {
        message: 'chore(release): v${nextRelease.version}',
        assets: ['CHANGELOG.md', 'package.json']
      }
    },
    '@semantic-release/github'
  ]
};