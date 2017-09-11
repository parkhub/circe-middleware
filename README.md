# Circe Middleware

A simple module that takes an array of functions(middleware) and passes the result of each to the next function in the array in order!

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
import middleware from '@parkhub/circe-middleware';

const firstMiddleware = (initialValue) => {
  console.log(`Getting the first value ${initialValue}`);

  return {
    initialValue
  };
};

const secondMiddleware = (value) => {
  console.log(`Getting the result of first middleware ${JSON.stringify(value, null, 4)}`);

  const { initialValue } = value;

  return initialValue;
};

const result = middleware([firstMiddleware, secondMiddleware])('Mikasa is bae');

if (result === 'Mikasa is bae') {
  console.log('Yes!');
}
```

## API
**middleware([function, function, ...function])**

Returns a function which you can then pass in the initial value to apply the middleware to.

```javascript
import middleware from '@parkhub/circe-middleware';

const applyMiddleware = middleware([fn1, fn2, fn3]);
const result = applyMiddleware('Satsuki');
```

**addMiddleware(function)**

Adds a middleware function to the end of the current array of functions, if any.
```javascript
import middleware from '@parkhub/circe-middleware';

const applyMiddleware = middleware();
const myFunction = (value) => console.log(value);

applyMiddleware.addMiddleware(myFunction);

applyMiddleware('Satsuki'); // Output to console: Satsuki 

const anotherMiddleware = middleware([myFunction));
const anotherFunction  = () => console.log('Is awesome');

anotherMiddleware.addMiddleware(anotherFunction);

anotherMiddleware('Satsuki'); 
/* Output to console: 
	Satsuki
	Is awesome
*/
```

## Result Analyzers
Result analyzers inspect the return value between each middleware to determine the next action, if any. They are all prefixed by the word *circe* to avoid clashes with actual result elements and should be an object property.


**circeShortCircuit**
```javascript
import middleware from '@parkhub/circe-middleware';

const startingValue = {
  awesome: 'allura'
};

const middlewareTwo = () => {};

const middlewareOne = () => ({
  circeShortCircuit: true
});

const middlewares = middleware([middlewareOne, middlewareTwo]);

middlewares(startingValue);
```
When this analyzer is set to **true**, the next middleware will **not execute**(default is **false**)

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





