/* @flow */

/**
 * @module @parkhub/circe-middleware
 * @author Daniel Olivares
 */

export default function circeMiddleware(middlewareFns: Array<(mixed) => mixed>): mixed => mixed {
  const localMiddlewareFns = middlewareFns;

  function applyMiddleware(...args: Array<mixed>) {
    const length = localMiddlewareFns.length;

    let index = 0;
    let result = middlewareFns[index](...args);

    // Let's start it off with the next function
    index += 1;

    while (index < length) {
      result = middlewareFns[index](result);
      index += 1; // Keep the loop going since our next function has executed
    }

    return result;
  }

  applyMiddleware.addMiddleware = function addMiddleware(middlewareFn) {
    localMiddlewareFns.push(middlewareFn);
  };

  return applyMiddleware;
}
