# Circe Middleware

A simple middleware module that you know and love. Using the "next" pattern means you can have async/sync middleware!

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![Dependencies][dependencyci-badge]][dependencyci]
[![version][version-badge]][package]
[![Apache License][license-badge]][LICENSE]
[![PRs Welcome][prs-badge]][prs]
[![Roadmap][roadmap-badge]][roadmap]
[![Semantic Release][semantic-release-badge]][sem-release-badge]
[![Commitizen][commitizen-friendly-badge]][comm-friendly-badge]


[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

## Install
```bash
npm install @parkhub/circe-middleware
```

## Usage
```javascript
import circeMiddleware from '@parkhub/circe-middleware';

const middlewareFnOne = (value, next) => {
  // value is 'starting value'

  // Call next and pass params with any arity(as long as next middleware expects the same arity)
  next('Satsuki!');
};

const middlewareFnTwo = (value, next) => {
  // Value is 'Satsuki!'

  // Call next and pass params with any arity(as long as next middleware expects the same arity)
  next({ going: 'gone' }, 1);
};

const middlewareFnThree = (obj, int, next) => {
  // obj is { going: 'gone' } and int is 1

  next('done');
}

// The middleware is executed in the order of the passed array
const middleware = circeMiddleware([middlewareFnOne, middlewareFnTwo]);

// This middleware will be executed after the first two passed into the middleware factory
middleware.use(middlewareFnThree);

middleware.run('starting value', (finalValue) => {
  // finalValue is 'done'
});
```

## Middlewares
A middleware is a function that receives an arbitrary number of parameters with the last one being the **next** function. 
**You have to be conscious of the order of the middlware and what it accepts as parameters**

## API
### use(middlewareFn)
#### middlewareFn - a function with signature of (arg1, arg2, ...argX, next)
Adds a middleware to the middleware stack.

### run(...args, () => {})
### The parameters passed into the run method are first with the last parameter being the FINAL function the middlewares


[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[sem-release-badge]: https://github.com/semantic-release/semantic-release
[build-badge]:  https://g.codefresh.io/api/badges/build?repoOwner=parkhub&repoName=circe-middleware&branch=master&pipelineName=circe-middleware&accountName=loganbfisher&type=cf-1
[build]:  https://g.codefresh.io/repositories/parkhub/circe-middleware/builds?filter=trigger:build;branch:master;service:59821c960ae1710001fef83c~circe-middleware
[coverage-badge]: https://img.shields.io/codecov/c/github/parkhub/circe-middleware.svg?style=flat-square
[coverage]: https://codecov.io/gh/parkhub/circe-middleware
[dependencyci-badge]: https://dependencyci.com/github/parkhub/circe-middleware/badge?style=flat-square
[dependencyci]: https://dependencyci.com/github/parkhub/circe-middleware
[version-badge]: https://img.shields.io/npm/v/@parkhub/circe-middleware.svg?style=flat-square
[package]: https://www.npmjs.com/package/@parkhub/circe-middleware
[license-badge]: https://img.shields.io/badge/License-Apache%202.0-blue.svg
[license]: https://github.com/parkhub/circe-middleware/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[roadmap-badge]: https://img.shields.io/badge/%F0%9F%93%94-roadmap-CD9523.svg?style=flat-square
[roadmap]: https://github.com/parkhub/circe-middleware/blob/master/ROADMAP.md
[github-watch-badge]: https://img.shields.io/github/watchers/parkhub/circe-middleware.svg?style=social
[github-watch]: https://github.com/parkhub/circe-middleware/watchers
[github-star-badge]: https://img.shields.io/github/stars/parkhub/circe-middleware.svg?style=social
[github-star]: https://github.com/parkhub/circe-middleware/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20prettier-eslint-cli!%20https://github.com/parkhub/circe-middleware%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/parkhub/circe-middleware.svg?style=social
[semantic-release]: https://github.com/semantic-release/semantic-release
[commitizen-friendly-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[comm-friendly-badge]: http://commitizen.github.io/cz-cli/






