/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Grid, Typography} from '@material-ui/core';

import StudentCard from './StudentCard';
import AddStudentButton from './AddStudentButton';
import ConnectedNewStudentForm from './ConnectedNewStudentForm';
import type {Student} from '../actions/types';

type Props = {
  students: Student[],
  newStudentFormOpen: boolean,
  onAddStudentClick: () => void,
  onNewStudentFormClose: () => void,
};

function StudentList(props: Props) {
  return (
    <div>
      <Typography variant="title" style={styles.title}>
        Students
      </Typography>
      <Grid container spacing={16} style={styles.grid}>
        {props.students.map(student => (
          <Grid item key={student.italkiId}>
            <StudentCard student={student} />
          </Grid>
        ))}
      </Grid>
      <ConnectedNewStudentForm
        onClose={props.onNewStudentFormClose}
        open={props.newStudentFormOpen}
      />
      <AddStudentButton
        onClick={props.onAddStudentClick}
        style={styles.addButton}
      />
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
  addButton: {
    position: 'fixed',
    bottom: 24,
    right: 24,
  },
};

export default StudentList;
