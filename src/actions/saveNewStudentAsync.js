/**
 * @prettier
 * @flow
 */

import type {ThunkAction, Student} from './types';

function saveNewStudentAsync(student: Student): ThunkAction {
  return async dispatch => {
    // TODO: Do a real post here
    dispatch({
      type: 'ADDED_STUDENT',
      student,
    });
  };
}

export default saveNewStudentAsync;
