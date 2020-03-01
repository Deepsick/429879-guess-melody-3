import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withUserAnswer from "./with-user-answer.js";
import {QUESTIONS} from '../../mocks/test-data';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withUserAnswer(MockComponent);


it(`Should change answers`, () => {
  const wrapper = shallow(<MockComponentWrapped
    question={QUESTIONS[0]}
    onAnswer={() => {}}
  />);

  expect(wrapper.props().userAnswers).toEqual([false, false, false, false]);

  wrapper.props().onChange(0, true);
  expect(wrapper.props().userAnswers).toEqual([true, false, false, false]);

  wrapper.props().onChange(0, false);
  expect(wrapper.props().userAnswers).toEqual([false, false, false, false]);

  wrapper.props().onChange(1, true);
  expect(wrapper.props().userAnswers).toEqual([false, true, false, false]);
});
