/**
 * @prettier
 * @flow
 */

import {connect} from 'react-redux';
import {compose, withState, withHandlers, lifecycle} from 'recompose';

import StudentList from './StudentList';
import fetchStudentsAsync from '../actions/fetchStudentsAsync';
import getStudents from '../store/selectors';
import type {Student} from '../actions/types';
import type {State} from '../store/selectors';

type Props = {
  students: Student[],
  setNewStudentFormOpen: (state: boolean) => void,
};

const connectToStore = connect(
  (state: State) => ({
    students: getStudents(state),
  }),
  {
    fetchStudents: fetchStudentsAsync,
  },
);

const setState = withState(
  'newStudentFormOpen',
  'setNewStudentFormOpen',
  false,
);

const setHandlers = withHandlers({
  onAddStudentClick: (props: Props) => () => {
    props.setNewStudentFormOpen(true);
  },
  onNewStudentFormClose: (props: Props) => () => {
    props.setNewStudentFormOpen(false);
  },
});

const setAsyncFetch = lifecycle({
  componentDidMount() {
    this.props.fetchStudents();
  },
});

const enhance = compose(
  connectToStore,
  setState,
  setAsyncFetch,
  setHandlers,
);

export default enhance(StudentList);
