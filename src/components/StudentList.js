/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {graphql, QueryRenderer} from 'react-relay';

import DroppableStudentCard from './DroppableStudentCard';
import AddStudentButton from './AddStudentButton';
import ConnectedNewStudentForm from './ConnectedNewStudentForm';
import relayEnvironment from '../relay/relayEnvironment';

type Props = {
  newStudentFormOpen: boolean,
  onAddStudentClick: () => void,
  onNewStudentFormClose: () => void,
};

type QueryResult = {
  error: ?Error,
  props: ?{
    user: ?{
      students: ?({
        id: string,
        italkiProfile: {
          nickname: string,
          avatarUrl: string,
          languages: {
            id: number,
            name: string,
          }[],
        },
      }[]),
    },
  },
};

function StudentList(props: Props) {
  return (
    <div>
      <Typography variant="title" style={styles.title}>
        Students
      </Typography>
      <QueryRenderer
        environment={relayEnvironment}
        cacheConfig={{force: true}}
        query={graphql`
          query StudentListQuery {
            user {
              students {
                id
                italkiProfile {
                  nickname
                  avatarUrl
                  languages(learning: true) {
                    id
                    name
                  }
                }
              }
            }
          }
        `}
        variables={{}}
        render={(result: QueryResult) => {
          if (result.error) {
            return <span>An error occured while loading students</span>;
          }
          if (!result.props || !result.props.user) {
            // TODO: Add a loading animation
            return <span>Loading students...</span>;
          }

          const {students} = result.props.user;

          if (!students || !students.length) {
            return <span>You haven&#39;t added any students yet</span>;
          }

          return (
            <Grid container spacing={16} style={styles.grid}>
              {students.map(student => (
                <Grid item key={student.id} style={styles.gridItem}>
                  <DroppableStudentCard
                    nickname={student.italkiProfile.nickname}
                    avatarUrl={student.italkiProfile.avatarUrl}
                    languages={student.italkiProfile.languages.map(
                      language => ({
                        id: language.id,
                        name: language.name,
                      }),
                    )}
                  />
                </Grid>
              ))}
            </Grid>
          );
        }}
      />
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
    padding: 5,
    width: '100%',
  },
  gridItem: {
    width: 250,
    height: 375,
  },
  addButton: {
    position: 'fixed',
    bottom: 24,
    right: 24,
  },
};

export default StudentList;
