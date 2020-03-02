import React from 'react';
import renderer from 'react-test-renderer';
import QuestionGenreItem from './question-genre-item.jsx';
import {ANSWER} from '../../mocks/test-data';

it(`GenreQuestionItem is rendered correctly`, () => {
  const tree = renderer.create((
    <QuestionGenreItem
      answer={ANSWER}
      id={0}
      onChange={() => {}}
      renderPlayer={() => {}}
      userAnswer={false}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
