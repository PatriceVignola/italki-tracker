/**
 * @prettier
 * @flow
 */

import type {Student} from '../actions/types';

export type State = {
  students: Student,
};

export default (state: State) => state.students;
