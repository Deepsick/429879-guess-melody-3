import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';
import {App} from './app.jsx';
import {QUESTIONS} from '../../mocks/test-data';
import {Error, WELCOME_SCREEN_STEP, ReducerName} from '../../const';

const mockStore = configureStore([]);

describe(`Render App correctly`, () => {
  it(`Render WelcomeScreen correctly`, () => {
    const store = mockStore({
      [ReducerName.GAME]: {
        mistakes: Error.START,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              maxMistakes={Error.MAX}
              questions={QUESTIONS}
              handleUserAnswer={() => {}}
              handleWelcomeButtonClick={() => {}}
              step={WELCOME_SCREEN_STEP}
              resetGame={() => {}}
              mistakes={Error.INCREMENT}
            />
          </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render GenreQuestionScreen correctly`, () => {
    const store = mockStore({
      [ReducerName.GAME]: {
        mistakes: Error.MAX,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              maxMistakes={Error.MAX}
              questions={QUESTIONS}
              handleUserAnswer={() => {}}
              handleWelcomeButtonClick={() => {}}
              step={0}
              resetGame={() => {}}
              mistakes={Error.INCREMENT}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render ArtistQuestionScreen`, () => {
    const store = mockStore({
      [ReducerName.GAME]: {
        mistakes: Error.MAX,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              maxMistakes={Error.MAX}
              questions={QUESTIONS}
              handleUserAnswer={() => {}}
              handleWelcomeButtonClick={() => {}}
              step={1}
              resetGame={() => {}}
              mistakes={Error.INCREMENT}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
