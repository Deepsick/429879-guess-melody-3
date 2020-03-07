import {combineReducers} from 'redux';
import {reducer as data} from './data/data.js';
import {reducer as game} from './game/game.js';
import {ReducerName} from '../const';

export default combineReducers({
  [ReducerName.DATA]: data,
  [ReducerName.GAME]: game,
});
