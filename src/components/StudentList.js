/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Grid} from '@material-ui/core';
import {graphql, createFragmentContainer} from 'react-relay';

import StudentCard from './StudentCard';

type Props = {
  viewer: {
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

const StudentList = ({viewer}: Props) => (
  <Grid container spacing={16} style={styles.grid}>
    {viewer.students.edges.map(({node}) => (
      <Grid item key={node.__id} style={styles.gridItem}>
        <StudentCard student={node} />
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

export default createFragmentContainer(
  StudentList,
  graphql`
    fragment StudentList_viewer on User {
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
