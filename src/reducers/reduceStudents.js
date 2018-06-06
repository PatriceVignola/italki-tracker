/**
 * @prettier
 * @flow
 */

import type {Student, Action} from '../actions/types';

const initialState = [];

function reduceStudents(
  state: Student[] = initialState,
  action: Action,
): Student[] {
  if (action.type === 'FETCHED_STUDENTS') {
    return action.students;
  }

  return state;
}

export default reduceStudents;
