import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from './welcome-screen.jsx';

const ERRORS_COUNT = 3;

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should call callback on welcome button click`, () => {
  const onWelcomeButtonClick = jest.fn();

  const welcomeScreen = shallow(
      <WelcomeScreen
        errorsCount={ERRORS_COUNT}
        onWelcomeButtonClick={onWelcomeButtonClick}
      />
  );


  const welcomeButton = welcomeScreen.find(`button.welcome__button`);

  welcomeButton.props().onClick();

  expect(onWelcomeButtonClick.mock.calls.length).toBe(1);
});
