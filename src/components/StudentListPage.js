/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Typography} from '@material-ui/core';
import {graphql, QueryRenderer} from 'react-relay';
import {withState, withHandlers, compose, mapProps} from 'recompose';

import AddStudentButton from './AddStudentButton';
import NewStudentForm from './NewStudentForm';
import relayEnvironment from '../relay/relayEnvironment';
import StudentList from './StudentList';

type WithState = {
  newStudentFormOpen: boolean,
  setNewStudentFormOpen: (open: boolean) => void,
};

type WithHandlers = {
  handleAddStudentClick: () => void,
  handleNewStudentFormClose: () => void,
} & WithState;

type Props = {
  newStudentFormOpen: boolean,
  handleAddStudentClick: () => void,
  handleNewStudentFormClose: () => void,
};

const StudentListPageQuery = graphql`
  query StudentListPageQuery {
    user {
      ...StudentList_viewer
      ...NewStudentForm_viewer
    }
  }
`;

const StudentListPage = (props: Props) => (
  <div>
    <Typography variant="title" style={styles.title}>
      Students
    </Typography>

    <QueryRenderer
      environment={relayEnvironment}
      query={StudentListPageQuery}
      render={result => {
        if (result.error) {
          return <div>{result.error.message}</div>;
        }
        if (result.props) {
          return (
            <div>
              <StudentList viewer={result.props.user} />

              <NewStudentForm
                onClose={props.handleNewStudentFormClose}
                open={props.newStudentFormOpen}
                viewer={result.props.user}
              />

              <AddStudentButton
                onClick={props.handleAddStudentClick}
                style={styles.addButton}
              />
            </div>
          );
        }

        return <div>Loading...</div>;
      }}
      variables={{}}
    />
  </div>
);

const styles = {
  title: {
    marginTop: 25,
    marginBottom: 25,
  },
  addButton: {
    position: 'fixed',
    bottom: 24,
    right: 24,
  },
};

const enhance = compose(
  withState('newStudentFormOpen', 'setNewStudentFormOpen', false),
  withHandlers({
    handleAddStudentClick: (props: WithState) => () => {
      props.setNewStudentFormOpen(true);
    },
    handleNewStudentFormClose: (props: WithState) => () => {
      props.setNewStudentFormOpen(false);
    },
  }),
  mapProps((props: WithHandlers) => ({
    handleAddStudentClick: props.handleAddStudentClick,
    handleNewStudentFormClose: props.handleNewStudentFormClose,
    newStudentFormOpen: props.newStudentFormOpen,
  })),
);

export default enhance(StudentListPage);
