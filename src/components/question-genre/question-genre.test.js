import React from 'react';
import renderer from 'react-test-renderer';
import QuestionGenre from './question-genre.jsx';
import {HANDLE_ANSWER_INPUT_CHANGE, QUESTIONS, RENDER_PLAYER} from '../../mocks/test-data';

it(`Should render QuestionGenre component correctly`, () => {
  const node = renderer.create(
      <QuestionGenre
        onAnswer={HANDLE_ANSWER_INPUT_CHANGE}
        question={QUESTIONS[0]}
        renderPlayer={RENDER_PLAYER}
        onChange={() => {}}
        userAnswers={[false, false, true, false]}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(node).toMatchSnapshot();
});
