import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const ERRORS_COUNT = 3;

it(`Should render App component correctly`, () => {
  const node = renderer.create(
      <App errorsCount={ERRORS_COUNT} />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
