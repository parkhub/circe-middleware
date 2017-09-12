/* @flow */

/**
 * @module @parkhub/circe-middleware
 * @author Daniel Olivares
 */

type Middleware = () => void;

/*
 * TODO The use method wraps an extra function around the stack of functions, how can we avoid it?
*/
function last(arr: mixed[]): mixed {
  const { length } = arr;

  return arr[length - 1];
}

function reduceOneRight(arr: mixed[]): mixed[] {
  return arr.slice(0, -1);
}

export default function circeMiddleware(middlewares: Middleware[] = []) {
  const middlewareProto: { use: (() => void) => void, run: () => void } = {
    use(fn) {
      this.run = (stack => (...args) => {
        const nonNextArgs = reduceOneRight(args);
        const next = last(args);

        return stack(...nonNextArgs, (...nextArgs) => {
          fn(...nextArgs, next);
        });
      })(this.run);
    },

    run(...args) {
      const next = last(args);

      if (typeof next !== 'function') {
        throw new Error('Final paramater must be a function');
      }

      next.apply(this, reduceOneRight(args));
    }
  };

  const middleware = Object.create(middlewareProto);

  middlewares.forEach(ware => middleware.use(ware));

  return middleware;
}
