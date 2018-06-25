/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Button, TextField, Typography} from '@material-ui/core/';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {Link} from 'react-router-dom';
import {compose, withHandlers, withState, mapProps, pure} from 'recompose';
import type {HOC} from 'recompose';

import signup from '../../relay/mutations/Signup';
import ProgressButton from '../ProgressButton';

type InputEvent = {
  target: {
    value: string,
  },
};

type InputProps = {
  onCompleted: () => void,
  onError: (error: Error) => void,
};

type WithState = {
  setEmail: (email: string) => void,
  setPassword: (password: string) => void,
  setConfirmationPassword: (confirmationPassword: string) => void,
  setProcessing: (processing: boolean) => void,
  email: string,
  password: string,
  confirmationPassword: string,
  processing: boolean,
} & InputProps;

type WithHandlers = {
  handleEmailChange: (event: InputEvent) => void,
  handlePasswordChange: (event: InputEvent) => void,
  handleConfirmationPasswordChange: (event: InputEvent) => void,
  handleSignupClick: () => void,
} & WithState;

type Props = {
  handleEmailChange: (event: InputEvent) => void,
  handlePasswordChange: (event: InputEvent) => void,
  handleConfirmationPasswordChange: (event: InputEvent) => void,
  handleSignupClick: () => void,
  processing: boolean,
};

function CreateAccountPage(props: Props) {
  return (
    <div>
      <Typography variant="title">Create a new account</Typography>

      <TextField
        autoFocus
        margin="dense"
        label="Email"
        type="email"
        fullWidth
        onChange={props.handleEmailChange}
        disabled={props.processing}
      />

      <div style={styles.passwordContainer}>
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          style={styles.password}
          onChange={props.handlePasswordChange}
          disabled={props.processing}
        />

        <TextField
          margin="dense"
          label="Confirm password"
          type="password"
          fullWidth
          style={styles.confirmPassword}
          onChange={props.handleConfirmationPasswordChange}
          disabled={props.processing}
        />
      </div>

      <div style={styles.buttonContainer}>
        <Button
          color="primary"
          style={styles.signinButton}
          component={Link}
          to="/signin"
          disabled={props.processing}
        >
          Sign in with an existing account
        </Button>

        <ProgressButton
          processing={props.processing}
          onClick={props.handleSignupClick}
        >
          <PersonAddIcon />
          <span style={styles.signupText}>Sign up</span>
        </ProgressButton>
      </div>
    </div>
  );
}

const styles = {
  buttonContainer: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'space-between',
  },
  signinButton: {
    padding: 10,
    textTransform: 'none',
  },
  passwordContainer: {
    display: 'flex',
  },
  password: {
    marginRight: 10,
    flex: 1,
  },
  confirmPassword: {
    marginLeft: 10,
    flex: 1,
  },
  signupText: {
    marginBottom: -3,
    marginLeft: 5,
  },
};

const enhance: HOC<*, InputProps> = compose(
  withState('email', 'setEmail', ''),
  withState('password', 'setPassword', ''),
  withState('confirmationPassword', 'setConfirmationPassword', ''),
  withState('processing', 'setProcessing', false),
  withHandlers({
    handleEmailChange: ({setEmail}: WithState) => (event: InputEvent) => {
      setEmail(event.target.value);
    },
    handlePasswordChange: ({setPassword}: WithState) => (event: InputEvent) => {
      setPassword(event.target.value);
    },
    handleConfirmationPasswordChange: ({
      setConfirmationPassword,
    }: WithState) => (event: InputEvent) => {
      setConfirmationPassword(event.target.value);
    },
    handleSignupClick: (props: WithState) => async () => {
      // TODO: Add material ui inline button progress
      try {
        if (props.password !== props.confirmationPassword) {
          throw Error("The passwords don't match.");
        }

        props.setProcessing(true);
        await signup({email: props.email, password: props.password});
        props.onCompleted();
      } catch (error) {
        props.onError(error);
      } finally {
        props.setProcessing(false);
      }
    },
  }),
  mapProps((props: WithHandlers) => ({
    handleEmailChange: props.handleEmailChange,
    handleConfirmationPasswordChange: props.handleConfirmationPasswordChange,
    handlePasswordChange: props.handlePasswordChange,
    handleSignupClick: props.handleSignupClick,
    processing: props.processing,
  })),
  pure,
);

export default enhance(CreateAccountPage);
