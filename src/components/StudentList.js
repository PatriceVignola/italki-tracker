/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Grid, Typography} from '@material-ui/core';

import StudentCard from './StudentCard';
import type {Student} from '../actions/types';

type Props = {
  students: Student[],
};

function StudentList(props: Props) {
  return (
    <div>
      <Typography variant="title" style={styles.title}>
        Students
      </Typography>
      <Grid container spacing={16} style={styles.grid}>
        {props.students.map(student => (
          <StudentCard key={student.id} student={student} />
        ))}
      </Grid>
    </div>
  );
}

const styles = {
  title: {
    marginTop: 25,
    marginBottom: 25,
  },
  grid: {
    margin: 5,
  },
};

export default StudentList;
