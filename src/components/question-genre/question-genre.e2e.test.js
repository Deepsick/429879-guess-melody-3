import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuestionGenre from './question-genre.jsx';
import {QUESTIONS} from '../../mocks/test-data';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should call callback on answer input change`, () => {
  const onAnswer = jest.fn((...args) => [...args]);
  const userAnswer = [false, true, false, false];

  const questionGenre = shallow(
      <QuestionGenre
        onAnswer={onAnswer}
        question={QUESTIONS[0]}
      />
  );

  const form = questionGenre.find(`form`);
  const answerInputs = questionGenre.find(`input`);
  const answerTwo = answerInputs.at(1);

  answerTwo.simulate(`change`, {target: {checked: true}});
  form.simulate(`submit`, {preventDefault() {}});

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(onAnswer.mock.calls[0][0]).toMatchObject(QUESTIONS[0]);
  expect(onAnswer.mock.calls[0][1]).toMatchObject(userAnswer);
});
