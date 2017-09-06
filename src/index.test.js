import middleware from './';

test('Should get multiple middleware and execute them in order passing results to one another', () => {
  expect.assertions(9);

  const startingValue = {
    test: 'one'
  };

  const middlewareOneReturn = 'string';
  const middlewareTwoReturn = { batman: 'is cool' };
  const finalReturn = 'final';

  const middlewareThree = jest.fn((value) => {
    expect(value).toEqual(middlewareTwoReturn);

    // eslint-disable-next-line no-use-before-define
    expect(middlewareTwo).toHaveBeenCalledTimes(1);

    // eslint-disable-next-line no-use-before-define
    expect(middlewareOne).toHaveBeenCalledTimes(1);

    return finalReturn;
  });

  const middlewareTwo = jest.fn((value) => {
    expect(value).toEqual(middlewareOneReturn);
    expect(middlewareThree).toHaveBeenCalledTimes(0);

    // eslint-disable-next-line no-use-before-define
    expect(middlewareOne).toHaveBeenCalledTimes(1);

    return middlewareTwoReturn;
  });

  const middlewareOne = jest.fn((value) => {
    expect(value).toEqual(startingValue);
    expect(middlewareThree).toHaveBeenCalledTimes(0);
    expect(middlewareTwo).toHaveBeenCalledTimes(0);

    return middlewareOneReturn;
  });

  middleware([middlewareOne, middlewareTwo, middlewareThree])(startingValue);
});

test('Should stop execution if any middleware throws', () => {
  expect.assertions(8);

  const startingValue = {
    test: 'one'
  };

  const middlewareOneReturn = 'string';

  const middlewareThree = jest.fn();

  const middlewareTwo = jest.fn((value) => {
    expect(value).toEqual(middlewareOneReturn);
    expect(middlewareThree).toHaveBeenCalledTimes(0);

    // eslint-disable-next-line no-use-before-define
    expect(middlewareOne).toHaveBeenCalledTimes(1);

    throw new Error('throwing');
  });

  const middlewareOne = jest.fn((value) => {
    expect(value).toEqual(startingValue);
    expect(middlewareThree).toHaveBeenCalledTimes(0);
    expect(middlewareTwo).toHaveBeenCalledTimes(0);

    return middlewareOneReturn;
  });

  expect(() =>
    middleware([middlewareOne, middlewareTwo, middlewareThree])(startingValue)
  ).toThrow();
  expect(middlewareThree).toHaveBeenCalledTimes(0);
});

test('Should allow me to add a middleware at the end of an existing set', () => {
  expect.assertions(9);

  const startingValue = {
    test: 'one'
  };

  const middlewareOneReturn = 'string';
  const middlewareTwoReturn = { batman: 'is cool' };
  const finalReturn = 'final';

  const middlewareThree = jest.fn((value) => {
    expect(value).toEqual(middlewareTwoReturn);

    // eslint-disable-next-line no-use-before-define
    expect(middlewareTwo).toHaveBeenCalledTimes(1);

    // eslint-disable-next-line no-use-before-define
    expect(middlewareOne).toHaveBeenCalledTimes(1);

    return finalReturn;
  });

  const middlewareTwo = jest.fn((value) => {
    expect(value).toEqual(middlewareOneReturn);
    expect(middlewareThree).toHaveBeenCalledTimes(0);

    // eslint-disable-next-line no-use-before-define
    expect(middlewareOne).toHaveBeenCalledTimes(1);

    return middlewareTwoReturn;
  });

  const middlewareOne = jest.fn((value) => {
    expect(value).toEqual(startingValue);
    expect(middlewareThree).toHaveBeenCalledTimes(0);
    expect(middlewareTwo).toHaveBeenCalledTimes(0);

    return middlewareOneReturn;
  });

  const middlewares = middleware([middlewareOne, middlewareTwo]);

  middlewares.addMiddleware(middlewareThree);

  middlewares(startingValue);
});
