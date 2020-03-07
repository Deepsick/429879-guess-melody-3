import React from 'react';
import renderer from 'react-test-renderer';
import {GameScreen} from './game-screen.jsx';
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';
import {GameType, Error} from '../../const';

const children = <div className="children-component" />;
const mockStore = configureStore([])({
  mistakes: Error.MAX,
});

describe(`GameScreen component render correctly`, () => {
  it(`with type GameType.ARTIST`, () => {
    const node = renderer.create(
        <Provider store={mockStore}>
          <GameScreen type={GameType.ARTIST} mistakes={Error.MAX} >
            {children}
          </GameScreen>
        </Provider>
    ).toJSON();

    expect(node).toMatchSnapshot();
  });

  it(`with type GameType.GENRE`, () => {
    const tree = renderer.create(
        <Provider store={mockStore}>
          <GameScreen type={GameType.GENRE} mistakes={Error.MAX} >
            {children}
          </GameScreen>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});


