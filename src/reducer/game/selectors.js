import {ReducerName} from "../../const";


const NAME_SPACE = ReducerName.GAME;

export const getStep = (state) => {
  return state[NAME_SPACE].step;
};

export const getMistakes = (state) => {
  return state[NAME_SPACE].mistakes;
};

export const getMaxMistakes = (state) => {
  return state[NAME_SPACE].maxMistakes;
};
