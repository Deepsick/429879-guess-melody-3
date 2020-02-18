import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from './welcome-screen.jsx';
import {HANDLE_WELCOME_BUTTON_CLICK, ERRORS_COUNT} from '../../mocks/test-data';

it(`Should render WelcomeScreen component correctly`, () => {
  const node = renderer.create(
      <WelcomeScreen
        errorsCount={ERRORS_COUNT}
        onWelcomeButtonClick={HANDLE_WELCOME_BUTTON_CLICK}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
