/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Paper, TextField, Typography} from '@material-ui/core/';
import {withHandlers, withState, mapProps, pure, compose} from 'recompose';
import type {HOC} from 'recompose';

import signin from '../relay/mutations/Signin';
import ResultSnackbar from './ResultSnackbar';

type InputEvent = {
  target: {
    value: string,
  },
};

type WithState = {
  setEmail: (email: string) => void,
  setPassword: (email: string) => void,
  setOpenError: (open: boolean) => void,
  setErrorMessage: (message: string) => void,
  email: string,
  password: string,
  openError: boolean,
  errorMessage: string,
};

type WithHandlers = {
  handleSigninClick: () => void,
  handleErrorClose: () => void,
  handleEmailChange: () => void,
  handlePasswordChange: () => void,
} & WithState;

type Props = {
  handleSigninClick: () => void,
  openError: boolean,
  errorMessage: string,
  handleErrorClose: () => void,
  handleEmailChange: (event: InputEvent) => void,
  handlePasswordChange: (event: InputEvent) => void,
};

function SigninForm(props: Props) {
  return (
    <div>
      <div style={styles.container}>
        <Paper elevation={4} style={styles.loginForm}>
          <Typography variant="title">Sign in</Typography>

          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            id="email"
            fullWidth
            onChange={props.handleEmailChange}
          />

          <TextField
            margin="dense"
            label="Password"
            type="password"
            id="password"
            fullWidth
            onChange={props.handlePasswordChange}
          />

          <div style={styles.buttonContainer}>
            <Button
              color="primary"
              style={styles.signupButton}
              component={Link}
              to="signup"
            >
              Create a new account
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={props.handleSigninClick}
            >
              Sign in
            </Button>
          </div>
        </Paper>
      </div>
      <ResultSnackbar
        open={props.openError}
        message={props.errorMessage}
        onClose={props.handleErrorClose}
        type="error"
      />
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginForm: {
    width: 500,
    border: 1,
    padding: 30,
  },
  buttonContainer: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'space-between',
  },
  signupButton: {
    padding: 10,
    textTransform: 'none',
  },
};

const enhance: HOC<*, {}> = compose(
  withState('email', 'setEmail', ''),
  withState('password', 'setPassword', ''),
  withState('openError', 'setOpenError', false),
  withState('errorMessage', 'setErrorMessage', ''),
  withHandlers({
    handleEmailChange: ({setEmail}: WithState) => ({target}: InputEvent) => {
      setEmail(target.value);
    },
    handlePasswordChange: (props: WithState) => ({target}: InputEvent) => {
      props.setPassword(target.value);
    },
    handleErrorClose: ({setOpenError}: WithState) => () => {
      setOpenError(false);
    },
    handleSigninClick: (props: WithState) => async () => {
      try {
        await signin({email: props.email, password: props.password});
        window.location.href = process.env.PUBLIC_URL;
      } catch (error) {
        props.setErrorMessage(error.toString());
        props.setOpenError(true);
      }
    },
  }),
  mapProps((props: WithHandlers) => ({
    handleSigninClick: props.handleSigninClick,
    openError: props.openError,
    errorMessage: props.errorMessage,
    handleErrorClose: props.handleErrorClose,
    handleEmailChange: props.handleEmailChange,
    handlePasswordChange: props.handlePasswordChange,
  })),
  pure,
);

export default enhance(SigninForm);
