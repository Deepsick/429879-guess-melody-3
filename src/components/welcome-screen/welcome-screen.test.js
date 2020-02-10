import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from './welcome-screen.jsx';

const ERRORS_COUNT = 3;
const onWelcomeButtonClick = () => {};

it(`Should render WelcomeScreen component correctly`, () => {
  const node = renderer.create(
      <WelcomeScreen
        errorsCount={ERRORS_COUNT}
        onWelcomeButtonClick={onWelcomeButtonClick}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
