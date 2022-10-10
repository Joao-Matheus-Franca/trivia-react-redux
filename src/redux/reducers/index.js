import { combineReducers } from 'redux';
import player from './player';
import questions from './questions';
import timer from './timer';

const rootReducer = combineReducers({ player, questions, timer });

export default rootReducer;
