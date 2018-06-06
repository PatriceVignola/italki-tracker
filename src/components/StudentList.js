/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Grid, Typography} from '@material-ui/core';

import StudentCard from './StudentCard';
import AddStudentButton from './AddStudentButton';
import type {Student} from '../actions/types';

type Props = {
  students: Student[],
};

function StudentList(props: Props) {
  return (
    <div style={styles.container}>
      <Typography variant="title" style={styles.title}>
        Students
      </Typography>
      <Grid container spacing={16} style={styles.grid}>
        {props.students.map(student => (
          <StudentCard key={student.id} student={student} />
        ))}
      </Grid>
      <AddStudentButton style={styles.addButton} />
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  title: {
    marginTop: 25,
    marginBottom: 25,
  },
  grid: {
    margin: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
};

export default StudentList;
