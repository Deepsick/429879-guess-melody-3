import React from 'react';
import renderer from 'react-test-renderer';
import QuestionArtist from './question-artist.jsx';
import {HANDLE_ANSWER_INPUT_CHANGE, QUESTIONS} from '../../mocks/test-data';

it(`Should render QuestionArtist component correctly`, () => {
  const node = renderer.create(
      <QuestionArtist
        onAnswer={HANDLE_ANSWER_INPUT_CHANGE}
        question={QUESTIONS[1]}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
