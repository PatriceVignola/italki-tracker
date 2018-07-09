/**
 * @prettier
 * @flow
 */

import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SchoolIcon from '@material-ui/icons/School';
import {createFragmentContainer, graphql} from 'react-relay';
import {withState, withHandlers, pure, compose} from 'recompose';
import Dropzone from 'react-dropzone';

import sendDocument from '../relay/mutations/SendDocument';
import withError from './hoc/withError';
import withSuccess from './hoc/withSuccess';

type ClickEvent = {
  currentTarget: any,
};

type Student = {
  id: string,
  italkiProfile: {
    nickname: string,
    languages: {
      id: number,
      name: string,
    }[],
    avatarUrl: ?string,
  },
};

type InputProps = {
  student: Student,
  onDeleteStudent: (studentId: string) => void,
};

type WithState = {
  hover: boolean,
  menuAnchor: any,
  errorMessage: string,
  errorOpen: boolean,
  successMessage: string,
  successOpen: boolean,
  processing: boolean,
  setHover: (hover: boolean) => void,
  setMenuAnchor: (anchor: any) => void,
  setErrorMessage: (message: string) => void,
  setErrorOpen: (open: boolean) => void,
  setSuccessMessage: (message: string) => void,
  setSuccessOpen: (open: boolean) => void,
  setProcessing: (processing: boolean) => void,
} & InputProps;

type WithHandlers = {
  handleMouseOver: () => void,
  handleMenuOpen: () => void,
  handleMenuClose: () => void,
  handleMouseOut: () => void,
  handleDelete: () => void,
  handleErrorClose: () => void,
  handleSuccessClose: () => void,
  handleFileDrop: (acceptedFiles: File[], rejectedFiles: File[]) => void,
} & WithState;

type Props = {
  student: Student,
  hover: boolean,
  menuAnchor: any,
  processing: boolean,
  handleMouseOver: () => void,
  handleMouseOut: () => void,
  handleMenuOpen: () => void,
  handleMenuClose: () => void,
  handleDelete: () => void,
  handleFileDrop: (acceptedFiles: File[], rejectedFiles: File[]) => void,
};

const StudentCard = (props: Props) => (
  <Dropzone onDrop={props.handleFileDrop} style={styles.dropZone} disableClick>
    <Paper
      style={styles.container}
      onMouseEnter={props.handleMouseOver}
      onMouseLeave={props.handleMouseOut}
    >
      <Card style={styles.container}>
        <CardMedia
          style={styles.cardMedia}
          image={
            props.student.italkiProfile.avatarUrl ||
            'https://www.italki.com/static/images/no_pic150.jpg'
          }
        />
        <CardContent style={styles.cardContent}>
          {props.processing && (
            <div>
              <CircularProgress style={styles.progress} size={24} />
            </div>
          )}
          {!props.processing &&
            props.hover && (
              <div>
                <IconButton
                  style={styles.moreButton}
                  onClick={props.handleMenuOpen}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={props.menuAnchor}
                  anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                  transformOrigin={{vertical: 'top', horizontal: 'right'}}
                  open={props.menuAnchor !== null}
                  onClose={props.handleMenuClose}
                >
                  <MenuItem onClick={props.handleDelete}>Delete</MenuItem>
                </Menu>
              </div>
            )}
          <Typography
            style={styles.text}
            gutterBottom
            variant="headline"
            component="h2"
          >
            {props.student.italkiProfile.nickname}
          </Typography>
          <Typography component="p" style={styles.text}>
            <SchoolIcon style={styles.schoolIcon} />
            <span>Learning: </span>
            {props.student.italkiProfile.languages.map((language, index) => {
              if (index < props.student.italkiProfile.languages.length - 1) {
                return <span key={language.id}>{language.name}, </span>;
              }

              return <span key={language.id}>{language.name}</span>;
            })}
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  </Dropzone>
);

const styles = {
  container: {
    width: '100%',
    height: '100%',
  },
  cardMedia: {
    height: 250,
  },
  cardContent: {
    position: 'relative',
  },
  moreButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  schoolIcon: {
    marginRight: 10,
  },
  text: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  dropZone: {
    width: '100%',
    height: '100%',
  },
  progress: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
};

const enhance = compose(
  withState('hover', 'setHover', false),
  withState('menuAnchor', 'setMenuAnchor', null),
  withState('errorMessage', 'setErrorMessage', ''),
  withState('errorOpen', 'setErrorOpen', false),
  withState('successMessage', 'setSuccessMessage', ''),
  withState('successOpen', 'setSuccessOpen', false),
  withState('processing', 'setProcessing', false),
  withHandlers({
    handleMouseOver: ({setHover}: WithState) => () => {
      setHover(true);
    },
    handleMouseOut: ({setHover}: WithState) => () => {
      setHover(false);
    },
    handleMenuOpen: ({setMenuAnchor}: WithState) => (event: ClickEvent) => {
      setMenuAnchor(event.currentTarget);
    },
    handleMenuClose: ({setMenuAnchor}: WithState) => () => {
      setMenuAnchor(null);
    },
    handleDelete: (props: WithState) => async () => {
      await props.onDeleteStudent(props.student.id);
      // TODO: Put loading on the delete button
      props.setMenuAnchor(null);
    },
    handleFileDrop: (props: WithState) => async (acceptedFiles: File[]) => {
      // TODO: Add a config to update the Documents store
      // TODO: Generalize for multiple files
      try {
        props.setProcessing(true);
        await sendDocument({studentId: props.student.id}, acceptedFiles[0]);
        props.setSuccessMessage('The document has been sent with success.');
        props.setSuccessOpen(true);
      } catch (error) {
        props.setErrorMessage(error.toString());
        props.setErrorOpen(true);
      } finally {
        props.setProcessing(false);
      }
    },
    handleErrorClose: ({setErrorOpen}: WithState) => () => {
      setErrorOpen(false);
    },
    handleSuccessClose: ({setSuccessOpen}: WithState) => () => {
      setSuccessOpen(false);
    },
  }),
  withError(({errorMessage, errorOpen, handleErrorClose}: WithHandlers) => ({
    message: errorMessage,
    open: errorOpen,
    onClose: handleErrorClose,
  })),
  withSuccess((props: WithHandlers) => ({
    message: props.successMessage,
    open: props.successOpen,
    onClose: props.handleSuccessClose,
  })),
  pure,
);

export default createFragmentContainer(
  enhance(StudentCard),
  graphql`
    fragment StudentCard_student on Student {
      id
      italkiProfile {
        languages(learning: true) {
          id
          name
        }
        nickname
        avatarUrl
      }
    }
  `,
);
