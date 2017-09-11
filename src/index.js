/* @flow */

/**
 * @module @parkhub/circe-middleware
 * @author Daniel Olivares
 */

function last(arr) {
  const length = arr.length;

  return arr[length - 1];
}

function reduceOneRight(arr) {
  return arr.slice(0, -1);
}

export default function circeMiddleware() {
  const middleware = {
    use(fn) {
      this.run = (stack => (...args) => {
        console.log('args', args);
        const newStackArgs = reduceOneRight(args);
        const next = last(args);

        // const wrappedNext = (...nextArgs) => {
        //   stack(...nextArgs, next.bind.apply(next, [null, ...nextArgs]));
        // };

        // return fn(...newStackArgs, wrappedNext);
        return stack(...newStackArgs, (...otherArgs) => {
          console.log('other', otherArgs);
          fn.apply(this, [...newStackArgs, next.bind.apply(next, [null, ...newStackArgs])]);
        });
      })(this.run);
    },

    run(...args) {
      console.log('running');
      const next = last(args);

      next.apply(this, reduceOneRight(args));
    }
  };

  return Object.create(middleware);
}
// function shouldShortCircuit(result) {
//   if (typeof result === 'object' && result !== null) {
//     return result.circeShortCircuit;
//   }
//
//   return false;
// }

// export default function circeMiddleware(middlewareFns: Array<(mixed) => mixed>): mixed => mixed {
//   const localMiddlewareFns = middlewareFns;
//
//   function applyMiddleware(...args: Array<mixed>) {
//     const length = localMiddlewareFns.length;
//
//     let index = 0;
//     let shortCircuit = false;
//     let result = middlewareFns[index](...args);
//
//     // Evaluate initial result
//     shortCircuit = shouldShortCircuit(result);
//
//     // Let's start it off with the next function
//     index += 1;
//
//     while (index < length && !shortCircuit) {
//       result = middlewareFns[index](result);
//
//       shortCircuit = shouldShortCircuit(result);
//
//       index += 1; // Keep the loop going since our next function has executed
//     }
//
//     return result;
//   }
//
//   applyMiddleware.addMiddleware = function addMiddleware(middlewareFn) {
//     localMiddlewareFns.push(middlewareFn);
//   };
//
//   return applyMiddleware;
// }
