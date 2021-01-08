# Contributing

**The issue tracker is only for bug reports and enhancement suggestions. If you have a question, please ask me directly on Discord (Lioness100#4566) instead of opening an issue**

If you wish to contribute to the Jampbot++ project's codebase or documentation, feel free to fork the repository and submit a
pull request.

## Requirements

- [x] We use [ESLint](https://eslint.org) and [Prettier](https://prettier.io/) to enforce a consistent coding style. Any PR that does not follow the linting rules will not be merged until the formatting is resolved.
- [x] We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) and [semver](http://semver.org/) to organize or project and make our commits more comprehensive. Any PR that does not follow conventional commits guidelines will not be merged until resolved.

## Setup

To get ready to work on the codebase, please do the following:

1. Fork & clone the repository, and make sure you're on the **main** branch
2. Run `npm install`
3. Fill out [`.env.example`](../.env.example) and rename it to [`.env`](../.env)
4. Code your heart out!

When committing to github, we use husky, commitlint, and lint-staged to make sure all content is up to standards. Make sure all tests pass!

6. ]Submit a pull request](./PULL_REQUEST_TEMPLATE)
