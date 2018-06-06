/**
 * @prettier
 * @flow
 */

import {combineReducers} from 'redux';
import students from './reduceStudents';

const reducers = combineReducers({
  students,
});

export default reducers;
