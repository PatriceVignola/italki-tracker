/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Snackbar, SnackbarContent} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
import {compose, pure} from 'recompose';
import type {HOC} from 'recompose';

type InputProps = {
  message: string,
  open: boolean,
  onClose: () => void,
  type: 'error' | 'success',
};

type Props = {
  open: boolean,
  onClose: () => void,
  message: string,
  classes: Object,
  type: 'error' | 'success',
};

function ResultSnackbar({open, message, onClose, classes, type}: Props) {
  return (
    <Snackbar
      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <SnackbarContent
        className={classes[type]}
        message={
          <span className={classes.message}>
            {(type === 'error' && (
              <ErrorIcon className={classes.messageIcon} />
            )) || <CheckCircleIcon classname={classes.messageIcon} />}
            {message}
          </span>
        }
      />
    </Snackbar>
  );
}

const styles = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  success: {
    backgroundColor: green[600],
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  messageIcon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
});

const enhance: HOC<*, InputProps> = compose(
  withStyles(styles),
  pure,
);

export default enhance(ResultSnackbar);
