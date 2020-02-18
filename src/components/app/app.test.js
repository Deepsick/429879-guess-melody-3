import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';
import {ERRORS_COUNT, QUESTIONS} from '../../mocks/test-data';

it(`Should render App component correctly`, () => {
  const node = renderer.create(
      <App
        errorsCount={ERRORS_COUNT}
        questions={QUESTIONS}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
