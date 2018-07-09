/**
 * @prettier
 * @flow
 */

import React from 'react';
import {compose, withHandlers, withState, lifecycle, pure} from 'recompose';
import {graphql, createFragmentContainer} from 'react-relay';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core/';
import type {HOC} from 'recompose';

import ProgressButton from './ProgressButton';
import withError from './hoc/withError';
import linkSkypeAccount from '../relay/mutations/LinkSkypeAccount';

type InputEvent = {
  target: {
    value: string,
  },
};

type InputProps = {
  open: boolean,
  description: string,
  onClose: () => void,
  onSuccess: () => void,
  viewer: {
    skypeUsername: string,
  },
};

type WithState = {
  username: string,
  password: string,
  processing: boolean,
  errorMessage: string,
  errorOpen: boolean,
  setUsername: (username: string) => void,
  setPassword: (password: string) => void,
  setProcessing: (processing: boolean) => void,
  setErrorMessage: (message: string) => void,
  setErrorOpen: (open: boolean) => void,
} & InputProps;

type WithHandlers = {
  handleUsernameChange: (event: InputEvent) => void,
  handlePasswordChange: (event: InputEvent) => void,
  handleLinkAccountClick: () => void,
  handleErrorClose: () => void,
} & WithState;

type Props = {
  open: boolean,
  description: string,
  processing: boolean,
  username: string,
  onClose: () => void,
  handleUsernameChange: (event: InputEvent) => void,
  handlePasswordChange: (event: InputEvent) => void,
  handleLinkAccountClick: () => void,
  viewer: {
    skypeUsername: string,
  },
};

const SkypeLoginForm = (props: Props) => (
  <Dialog open={props.open} onClose={props.onClose}>
    <DialogTitle>Skype Login</DialogTitle>
    <DialogContent>
      <Typography variant="caption">{props.description}</Typography>

      <TextField
        margin="dense"
        label="Skype Account"
        onChange={props.handleUsernameChange}
        value={props.username}
        fullWidth
        autoFocus={props.viewer.skypeUsername === null}
        disabled={props.processing}
      />

      <TextField
        margin="dense"
        label="Skype Password"
        onChange={props.handlePasswordChange}
        fullWidth
        autoFocus={props.viewer.skypeUsername !== null}
        disabled={props.processing}
        type="password"
      />
    </DialogContent>
    <DialogActions>
      <Button
        color="primary"
        disabled={props.processing}
        onClick={props.onClose}
      >
        Cancel
      </Button>

      <ProgressButton
        processing={props.processing}
        onClick={props.handleLinkAccountClick}
      >
        Login
      </ProgressButton>
    </DialogActions>
  </Dialog>
);

const enhance: HOC<*, InputProps> = compose(
  withState('username', 'setUsername', ''),
  withState('password', 'setPassword', ''),
  withState('processing', 'setProcessing', false),
  withState('errorMessage', 'setErrorMessage', ''),
  withState('errorOpen', 'setErrorOpen', false),
  lifecycle({
    componentDidMount() {
      this.props.setUsername(this.props.viewer.skypeUsername);
    },
  }),
  withHandlers({
    handleUsernameChange: ({setUsername}: WithState) => (event: InputEvent) => {
      setUsername(event.target.value);
    },
    handlePasswordChange: ({setPassword}: WithState) => (event: InputEvent) => {
      setPassword(event.target.value);
    },
    handleLinkAccountClick: (props: WithState) => async () => {
      try {
        props.setProcessing(true);

        await linkSkypeAccount({
          username: props.username,
          password: props.password,
        });

        props.onSuccess();
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
  }),
  withError(({errorMessage, errorOpen, handleErrorClose}: WithHandlers) => ({
    message: errorMessage,
    open: errorOpen,
    onClose: handleErrorClose,
  })),
  pure,
);

export default createFragmentContainer(
  enhance(SkypeLoginForm),
  graphql`
    fragment SkypeLoginForm_viewer on User {
      skypeUsername
    }
  `,
);
