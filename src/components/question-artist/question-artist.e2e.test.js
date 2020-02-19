import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuestionArtist from './question-artist.jsx';
import {QUESTIONS, RENDER_PLAYER} from '../../mocks/test-data';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should call callback on answer input change`, () => {
  const onAnswer = jest.fn((...args) => [...args]);
  const userAnswer = QUESTIONS[1].answers[0];

  const questionArtist = shallow(
      <QuestionArtist
        onAnswer={onAnswer}
        question={QUESTIONS[1]}
        renderPlayer={RENDER_PLAYER}
      />
  );

  const answerInputs = questionArtist.find(`input`);
  const answerOne = answerInputs.at(0);

  answerOne.simulate(`change`, {preventDefault() {}});

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(onAnswer.mock.calls[0][0]).toMatchObject(QUESTIONS[1]);
  expect(onAnswer.mock.calls[0][1]).toMatchObject(userAnswer);
});
