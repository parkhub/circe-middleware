import circeMiddleware from './';

test('Should throw an error if the last parameter of a middleware is not a function', () => {
  const middleware = circeMiddleware();

  expect(() => middleware.run()).toThrow();
});

test('Should accept an array of middlewares', () => {
  expect.assertions(10);

  const startingValue = {
    test: 'one'
  };

  const middlewareOneReturn = 'string';
  const middlewareTwoReturn = { batman: 'is cool' };
  const finalReturn = 'final';

  const middlewareThree = jest.fn((value, next) => {
    expect(value).toEqual(middlewareTwoReturn);

    // eslint-disable-next-line no-use-before-define
    expect(middlewareTwo).toHaveBeenCalledTimes(1);

    // eslint-disable-next-line no-use-before-define
    expect(middlewareOne).toHaveBeenCalledTimes(1);

    return next(finalReturn);
  });

  const middlewareTwo = jest.fn((value, next) => {
    expect(value).toEqual(middlewareOneReturn);
    expect(middlewareThree).toHaveBeenCalledTimes(0);

    // eslint-disable-next-line no-use-before-define
    expect(middlewareOne).toHaveBeenCalledTimes(1);

    return next(middlewareTwoReturn);
  });

  const middlewareOne = jest.fn((value, next) => {
    expect(value).toEqual(startingValue);
    expect(middlewareThree).toHaveBeenCalledTimes(0);
    expect(middlewareTwo).toHaveBeenCalledTimes(0);

    return next(middlewareOneReturn);
  });

  const middleware = circeMiddleware([middlewareOne, middlewareTwo]);
  middleware.use(middlewareThree);

  middleware.run(startingValue, (finalValue) => {
    expect(finalValue).toBe(finalReturn);
  });
});

test('Should get multiple middleware and execute them in order passing results to one another', () => {
  expect.assertions(10);

  const middleware = circeMiddleware();
  const startingValue = {
    test: 'one'
  };

  const middlewareOneReturn = 'string';
  const middlewareTwoReturn = { batman: 'is cool' };
  const finalReturn = 'final';

  const middlewareThree = jest.fn((value, next) => {
    expect(value).toEqual(middlewareTwoReturn);

    // eslint-disable-next-line no-use-before-define
    expect(middlewareTwo).toHaveBeenCalledTimes(1);

    // eslint-disable-next-line no-use-before-define
    expect(middlewareOne).toHaveBeenCalledTimes(1);

    return next(finalReturn);
  });

  const middlewareTwo = jest.fn((value, next) => {
    expect(value).toEqual(middlewareOneReturn);
    expect(middlewareThree).toHaveBeenCalledTimes(0);

    // eslint-disable-next-line no-use-before-define
    expect(middlewareOne).toHaveBeenCalledTimes(1);

    return next(middlewareTwoReturn);
  });

  const middlewareOne = jest.fn((value, next) => {
    expect(value).toEqual(startingValue);
    expect(middlewareThree).toHaveBeenCalledTimes(0);
    expect(middlewareTwo).toHaveBeenCalledTimes(0);

    return next(middlewareOneReturn);
  });

  middleware.use(middlewareOne);
  middleware.use(middlewareTwo);
  middleware.use(middlewareThree);

  middleware.run(startingValue, (finalValue) => {
    expect(finalValue).toBe(finalReturn);
  });
});

test('Should pass to each function regardless of arity', () => {
  expect.assertions(9);

  const middleware = circeMiddleware();
  const startingValue = {
    test: 'one'
  };
  const secondStartingValue = '2nd';

  const firstmwareReturn = 'string';
  const secondmwareReturn = { batman: 'is cool' };
  const finalReturnOne = 'final';
  const finalReturnTwo = 'finalTwo';

  const middlewareThree = jest.fn(next => next(finalReturnOne, finalReturnTwo));

  const middlewareTwo = jest.fn((middlewareOnePassedValue, middlewareTwoPassedValue, next) => {
    expect(middlewareOnePassedValue).toEqual(firstmwareReturn);
    expect(middlewareTwoPassedValue).toEqual(secondmwareReturn);

    // eslint-disable-next-line no-use-before-define
    expect(middlewareOne).toHaveBeenCalledTimes(1);

    return next();
  });

  const middlewareOne = jest.fn((value, valueTwo, next) => {
    expect(value).toEqual(startingValue);
    expect(valueTwo).toEqual(secondStartingValue);
    expect(middlewareTwo).toHaveBeenCalledTimes(0);

    return next(firstmwareReturn, secondmwareReturn);
  });

  middleware.use(middlewareOne);
  middleware.use(middlewareTwo);
  middleware.use(middlewareThree);

  middleware.run(startingValue, secondStartingValue, (finalValue, finalValueTwo) => {
    expect(finalValue).toBe(finalReturnOne);
    expect(finalValueTwo).toBe(finalReturnTwo);
    expect(middlewareThree).toHaveBeenCalledTimes(1);
  });
});
