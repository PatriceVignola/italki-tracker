/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Button, TextField, Typography} from '@material-ui/core/';
import LinkIcon from '@material-ui/icons/Link';
import {withState, withHandlers, pure, compose, mapProps} from 'recompose';
import type {HOC} from 'recompose';

import linkSkypeAccount from '../../relay/mutations/LinkSkypeAccount';
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
  username: string,
  password: string,
  processing: boolean,
  setUsername: (username: string) => void,
  setPassword: (password: string) => void,
  setProcessing: (processing: boolean) => void,
} & InputProps;

type WithHandlers = {
  handleSkipClick: () => void,
  handleLinkAccountClick: () => void,
  handleUsernameChange: (event: InputEvent) => void,
  handlePasswordChange: (event: InputEvent) => void,
} & WithState;

type Props = {
  handleSkipClick: () => void,
  handleLinkAccountClick: () => void,
  handleUsernameChange: (event: InputEvent) => void,
  handlePasswordChange: (event: InputEvent) => void,
  processing: boolean,
};

function NewAccountPage(props: Props) {
  return (
    <div>
      <Typography variant="title">Link your Skype account</Typography>
      <Typography variant="caption">
        This is required if you want to send files through Skype
      </Typography>

      <TextField
        margin="dense"
        label="Skype username or email"
        disabled={props.processing}
        fullWidth
        onChange={props.handleUsernameChange}
      />

      <TextField
        margin="dense"
        label="Password"
        type="password"
        disabled={props.processing}
        fullWidth
        onChange={props.handlePasswordChange}
      />

      <div style={styles.buttonContainer}>
        <Button
          color="primary"
          style={styles.secondaryButton}
          disabled={props.processing}
          onClick={props.handleSkipClick}
        >
          Do it later
        </Button>
        <ProgressButton
          processing={props.processing}
          onClick={props.handleLinkAccountClick}
        >
          <LinkIcon />
          <span style={styles.linkText}>Link</span>
        </ProgressButton>
      </div>
    </div>
  );
}

const styles = {
  buttonContainer: {
    justifyContent: 'flex-end',
    display: 'flex',
    marginTop: 15,
  },
  secondaryButton: {
    padding: 10,
    textTransform: 'none',
  },
  linkText: {
    marginBottom: -3,
    marginLeft: 5,
  },
};

const enhance: HOC<*, InputProps> = compose(
  withState('username', 'setUsername', ''),
  withState('password', 'setPassword', ''),
  withState('processing', 'setProcessing', false),
  withHandlers({
    handleUsernameChange: ({setUsername}: WithState) => (event: InputEvent) => {
      setUsername(event.target.value);
    },
    handlePasswordChange: ({setPassword}: WithState) => (event: InputEvent) => {
      setPassword(event.target.value);
    },
    handleSkipClick: ({onCompleted}: WithState) => () => {
      onCompleted();
    },
    handleLinkAccountClick: (props: WithState) => async () => {
      try {
        props.setProcessing(true);

        await linkSkypeAccount({
          username: props.username,
          password: props.password,
        });

        props.onCompleted();
      } catch (error) {
        props.setProcessing(false);
        props.onError(error);
      } finally {
        props.setProcessing(false);
      }
    },
  }),
  mapProps((props: WithHandlers) => ({
    handleSkipClick: props.handleSkipClick,
    handleLinkAccountClick: props.handleLinkAccountClick,
    handleUsernameChange: props.handleUsernameChange,
    handlePasswordChange: props.handlePasswordChange,
    processing: props.processing,
  })),
  pure,
);

export default enhance(NewAccountPage);
