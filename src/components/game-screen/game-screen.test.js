import React from 'react';
import renderer from 'react-test-renderer';
import GameScreen from './game-screen.jsx';
import {GameType} from '../../const';


it(`Should render GameScreen component correctly`, () => {
  const node = renderer.create(
      <GameScreen type={GameType.ARTIST}>
        <div></div>
        <div></div>
      </GameScreen>
  ).toJSON();

  expect(node).toMatchSnapshot();
});
