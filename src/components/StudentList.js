/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Grid} from 'material-ui';

import StudentCard from './StudentCard';
import type {Student} from '../actions/types';

type Props = {
  students: Student[],
};

function StudentList(props: Props) {
  return (
    <Grid container spacing={16}>
      {props.students.map(student => (
        <StudentCard key={student.id} student={student} />
      ))}
    </Grid>
  );
}

export default StudentList;
