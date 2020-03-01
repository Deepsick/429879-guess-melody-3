import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuestionGenre from './question-genre.jsx';
import {QUESTIONS, RENDER_PLAYER} from '../../mocks/test-data';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`When user answers genre question form is not sent`, () => {
  const onAnswer = jest.fn();
  const genreQuestion = shallow(<QuestionGenre
    onAnswer={onAnswer}
    question={QUESTIONS[0]}
    renderPlayer={RENDER_PLAYER}
    onChange={() => {}}
    userAnswers={[false, false, false, false]}
  />);

  const form = genreQuestion.find(`form`);
  const formSendPrevention = jest.fn();
  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});

it(`User answer passed to callback is consistent with "userAnswer" prop`, () => {
  const onAnswer = jest.fn((...args) => [...args]);
  const userAnswer = [false, true, false, false];

  const genreQuestion = mount(<QuestionGenre
    onAnswer={onAnswer}
    question={QUESTIONS[0]}
    renderPlayer={() => {}}
    onChange={() => {}}
    userAnswers={userAnswer}
  />);

  const form = genreQuestion.find(`form`);
  const inputTwo = genreQuestion.find(`input`).at(1);

  inputTwo.simulate(`change`, {target: {checked: true}});
  form.simulate(`submit`, {preventDefault() {}});

  expect(onAnswer).toHaveBeenCalledTimes(1);

  expect(onAnswer.mock.calls[0][0]).toEqual(void 0);

  expect(
      genreQuestion.find(`input`).map((it) => it.prop(`checked`))
  ).toEqual(userAnswer);
});
