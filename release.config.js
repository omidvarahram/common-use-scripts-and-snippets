const commitAnalyzer = await import('@semantic-release/commit-analyzer');
const releaseNotesGenerator = await import('@semantic-release/release-notes-generator');
const execPlugin = await import('@semantic-release/exec');
const changelogPlugin = await import('@semantic-release/changelog');
const npmPlugin = await import('@semantic-release/npm');
const gitPlugin = await import('@semantic-release/git');
const githubPlugin = await import('@semantic-release/github');

export default {
  repositoryUrl: 'https://github.aus.thenational.com/NAB-X/nui-themes.git',
  branches: ['master'],
  extends: 'semantic-release-monorepo',
  plugins: [
    commitAnalyzer.default,
    {
      preset: 'angular'
    },
    releaseNotesGenerator.default,
    {
      [execPlugin.default]: {
        successCmd: 'echo ${nextRelease.version} > .next-version.txt'
      }
    },
    {
      [changelogPlugin.default]: {
        changelogFile: 'CHANGELOG.md'
      }
    },
    npmPlugin.default,
    {
      [gitPlugin.default]: {
        message: 'chore(release): v${nextRelease.version}',
        assets: ['CHANGELOG.md', 'package.json']
      }
    },
    githubPlugin.default
  ]
};