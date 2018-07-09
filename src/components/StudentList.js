/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Grid} from '@material-ui/core';
import {graphql, createFragmentContainer} from 'react-relay';
import {withHandlers} from 'recompose';

import StudentCard from './StudentCard';
import deleteStudent from '../relay/mutations/DeleteStudent';

type InputProps = {
  viewer: {
    id: string,
    students: {
      edges: {
        node: {
          __id: string,
          italkiProfile: {
            nickname: string,
            languages: {
              id: number,
              name: string,
            }[],
            avatarUrl: ?string,
          },
        },
      }[],
    },
  },
};

type Props = {
  handleDeleteStudent: (studentId: string) => void,
} & InputProps;

const StudentList = ({viewer, handleDeleteStudent}: Props) => (
  <Grid container spacing={16} style={styles.grid}>
    {viewer.students.edges.map(({node}) => (
      <Grid item key={node.__id} style={styles.gridItem}>
        <StudentCard
          student={node}
          teacherId={viewer.id}
          onDeleteStudent={handleDeleteStudent}
        />
      </Grid>
    ))}
  </Grid>
);

const styles = {
  grid: {
    padding: 5,
    width: '100%',
  },
  gridItem: {
    width: 250,
    height: 375,
  },
};

const enhance = withHandlers({
  handleDeleteStudent: (props: InputProps) => async (studentId: string) => {
    const configs = [
      {
        type: 'RANGE_DELETE',
        parentID: props.viewer.id,
        connectionKeys: [
          {
            key: 'StudentCard_students',
          },
        ],
        pathToConnection: ['user', 'students'],
        deletedIDFieldName: 'deletedStudentId',
      },
      {
        type: 'NODE_DELETE',
        deletedIDFieldName: 'deletedStudentId',
      },
    ];

    await deleteStudent({id: studentId}, configs);
  },
});

export default createFragmentContainer(
  enhance(StudentList),
  graphql`
    fragment StudentList_viewer on User {
      id
      students(first: 1, last: 100)
        @connection(key: "StudentCard_students", filters: []) {
        edges {
          node {
            ...StudentCard_student
          }
        }
      }
    }
  `,
);
