import circeMiddleware from './';

test('Should get multiple middleware and execute them in order passing results to one another', () => {
  expect.assertions(9);

  const middleware = circeMiddleware();
  const startingValue = {
    test: 'one'
  };

  const middlewareOneReturn = 'string';
  const middlewareTwoReturn = { batman: 'is cool' };
  const finalReturn = 'final';

  const middlewareThree = jest.fn((value, next) => {
    console.log('middleware three');
    expect(value).toEqual(middlewareTwoReturn);

    // eslint-disable-next-line no-use-before-define
    expect(middlewareTwo).toHaveBeenCalledTimes(1);

    // eslint-disable-next-line no-use-before-define
    expect(middlewareOne).toHaveBeenCalledTimes(1);

    return next(finalReturn);
  });

  const middlewareTwo = jest.fn((value, next) => {
    console.log('middleware two', value);
    // expect(value).toEqual(middlewareOneReturn);
    // expect(middlewareThree).toHaveBeenCalledTimes(0);

    // eslint-disable-next-line no-use-before-define
    // expect(middlewareOne).toHaveBeenCalledTimes(1);

    console.log('next there', JSON.stringify(next));
    return next(middlewareTwoReturn);
  });

  const middlewareOne = jest.fn((value, next) => {
    console.log('middleware one', value);
    // expect(value).toEqual(startingValue);
    // expect(middlewareThree).toHaveBeenCalledTimes(0);
    // expect(middlewareTwo).toHaveBeenCalledTimes(0);

    return next(middlewareOneReturn);
  });

  middleware.use(middlewareOne);
  middleware.use(middlewareTwo);
  // middleware.use(middlewareThree);

  console.log('run', middleware.run);
  middleware.run(startingValue, (finalValue) => {
    console.log('final value', finalValue);
    expect(finalValue).toBe(finalReturn);
  });
});

// test('Should stop execution if any middleware throws', () => {
//   expect.assertions(8);
//
//   const startingValue = {
//     test: 'one'
//   };
//
//   const middlewareOneReturn = 'string';
//
//   const middlewareThree = jest.fn();
//
//   const middlewareTwo = jest.fn((value) => {
//     expect(value).toEqual(middlewareOneReturn);
//     expect(middlewareThree).toHaveBeenCalledTimes(0);
//
//     // eslint-disable-next-line no-use-before-define
//     expect(middlewareOne).toHaveBeenCalledTimes(1);
//
//     throw new Error('throwing');
//   });
//
//   const middlewareOne = jest.fn((value) => {
//     expect(value).toEqual(startingValue);
//     expect(middlewareThree).toHaveBeenCalledTimes(0);
//     expect(middlewareTwo).toHaveBeenCalledTimes(0);
//
//     return middlewareOneReturn;
//   });
//
//   expect(() =>
//     middleware([middlewareOne, middlewareTwo, middlewareThree])(startingValue)
//   ).toThrow();
//   expect(middlewareThree).toHaveBeenCalledTimes(0);
// });
//
// test('Should allow me to add a middleware at the end of an existing set', () => {
//   expect.assertions(9);
//
//   const startingValue = {
//     test: 'one'
//   };
//
//   const middlewareOneReturn = 'string';
//   const middlewareTwoReturn = { batman: 'is cool' };
//   const finalReturn = 'final';
//
//   const middlewareThree = jest.fn((value) => {
//     expect(value).toEqual(middlewareTwoReturn);
//
//     // eslint-disable-next-line no-use-before-define
//     expect(middlewareTwo).toHaveBeenCalledTimes(1);
//
//     // eslint-disable-next-line no-use-before-define
//     expect(middlewareOne).toHaveBeenCalledTimes(1);
//
//     return finalReturn;
//   });
//
//   const middlewareTwo = jest.fn((value) => {
//     expect(value).toEqual(middlewareOneReturn);
//     expect(middlewareThree).toHaveBeenCalledTimes(0);
//
//     // eslint-disable-next-line no-use-before-define
//     expect(middlewareOne).toHaveBeenCalledTimes(1);
//
//     return middlewareTwoReturn;
//   });
//
//   const middlewareOne = jest.fn((value) => {
//     expect(value).toEqual(startingValue);
//     expect(middlewareThree).toHaveBeenCalledTimes(0);
//     expect(middlewareTwo).toHaveBeenCalledTimes(0);
//
//     return middlewareOneReturn;
//   });
//
//   const middlewares = middleware([middlewareOne, middlewareTwo]);
//
//   middlewares.addMiddleware(middlewareThree);
//
//   middlewares(startingValue);
// });
//
// test('Should short-circuit middleware if shortCircuit function is defined', () => {
//   const startingValue = {
//     test: 'one'
//   };
//
//   const middlewareTwo = jest.fn();
//
//   const middlewareOne = jest.fn(() => ({
//     circeShortCircuit: true
//   }));
//
//   const middlewares = middleware([middlewareOne, middlewareTwo]);
//
//   middlewares(startingValue);
//
//   expect(middlewareOne).toHaveBeenCalledTimes(1);
//   expect(middlewareTwo).toHaveBeenCalledTimes(0);
// });
//
// test('Should allow for errors thrown and returned in one function', () => {
//   const startingValue = {
//     test: 'one'
//   };
//
//   const middlewareTwo = jest.fn();
//
//   const middlewareOne = jest.fn(() => {
//     try {
//       throw new Error('Err');
//     } catch (e) {
//       return {
//         circeShortCircuit: true
//       };
//     }
//   });
//
//   const middlewares = middleware([middlewareOne, middlewareTwo]);
//
//   middlewares(startingValue);
//
//   expect(middlewareOne).toHaveBeenCalledTimes(1);
//   expect(middlewareTwo).toHaveBeenCalledTimes(0);
// });
//
// test('Should short-circuit from any middleware order', () => {
//   const startingValue = {
//     test: 'one'
//   };
//
//   const middlewareFive = jest.fn();
//   const middlewareFour = jest.fn();
//   const middlewareThree = jest.fn(() => ({ circeShortCircuit: true }));
//   const middlewareTwo = jest.fn();
//   const middlewareOne = jest.fn();
//
//   const middlewares = middleware([
//     middlewareOne,
//     middlewareTwo,
//     middlewareThree,
//     middlewareFour,
//     middlewareFive
//   ]);
//
//   middlewares(startingValue);
//
//   expect(middlewareOne).toHaveBeenCalledTimes(1);
//   expect(middlewareTwo).toHaveBeenCalledTimes(1);
//   expect(middlewareThree).toHaveBeenCalledTimes(1);
//   expect(middlewareFour).toHaveBeenCalledTimes(0);
//   expect(middlewareFive).toHaveBeenCalledTimes(0);
// });
// const startingValue = {
//   awesome: 'allura'
// };
//
// const middlewareTwo = () => {};
//
// const middlewareOne = () => ({
//   circeShortCircuit: true
// });
//
// const middlewares = middleware([middlewareOne, middlewareTwo]);
//
// middlewares(startingValue);
