/**
 * @prettier
 * @flow
 */

import {connect} from 'react-redux';
import {compose, withProps, lifecycle} from 'recompose';

import StudentList from './StudentList';
import fetchStudentsAsync from '../actions/fetchStudentsAsync';
import getStudents from '../store/selectors';
import type {Student} from '../actions/types';
import type {State} from '../store/selectors';

type Props = {
  students: Student[],
};

const connectToStore = connect(
  (state: State) => ({
    students: getStudents(state),
  }),
  {
    fetchStudents: fetchStudentsAsync,
  },
);

const setProps = withProps((props: Props) => ({
  students: props.students,
}));

const setAsyncFetch = lifecycle({
  componentDidMount() {
    this.props.fetchStudents();
  },
});

const enhance = compose(
  connectToStore,
  setProps,
  setAsyncFetch,
);

export default enhance(StudentList);
