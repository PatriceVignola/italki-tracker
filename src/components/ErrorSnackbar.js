/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Snackbar, SnackbarContent} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import {compose, mapProps} from 'recompose';
import type {HOC} from 'recompose';

type InputProps = {
  message: string,
  open: boolean,
  onClose: () => void,
};

type MapProps = {
  classes: Object,
} & InputProps;

type Props = {
  open: boolean,
  onClose: () => void,
  message: string,
  classes: Object,
};

function ErrorSnackbar({open, message, onClose, classes}: Props) {
  return (
    <Snackbar
      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <SnackbarContent
        className={classes.container}
        message={
          <span className={classes.message}>
            <ErrorIcon className={classes.messageIcon} />
            {message}
          </span>
        }
      />
    </Snackbar>
  );
}

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.error.dark,
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
  mapProps(({open, onClose, message, classes}: MapProps) => ({
    open,
    onClose,
    message,
    classes,
  })),
);

export default enhance(ErrorSnackbar);
