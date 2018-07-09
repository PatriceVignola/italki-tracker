/**
 * @prettier
 * @flow
 */

import React from 'react';
import {compose, withHandlers, withState, lifecycle, pure} from 'recompose';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core/';
import {graphql, createFragmentContainer} from 'react-relay';
import type {HOC} from 'recompose';

import addStudent from '../relay/mutations/AddStudent';
import ItalkiAvatar from './ItalkiAvatar';
import withError from './hoc/withError';
import {getSkypeToken} from '../auth';
import SkypeLoginForm from './SkypeLoginForm';
import ProgressButton from './ProgressButton';

type InputEvent = {
  target: {
    value: string,
  },
};

type InputProps = {
  onClose: () => void,
  open: boolean,
  viewer: {
    id: string,
  },
};

type WithState = {
  italkiId: number,
  email: string,
  skype: string,
  weChat: string,
  skypeLoginOpen: boolean,
  errorOpen: boolean,
  errorMessage: string,
  processing: boolean,
  setItalkiId: (italkiId: string) => void,
  setEmail: (email: string) => void,
  setSkype: (skype: string) => void,
  setWeChat: (weChat: string) => void,
  setSkypeLoginOpen: (open: boolean) => void,
  setErrorOpen: (open: boolean) => void,
  setErrorMessage: (message: string) => void,
  setProcessing: (processing: boolean) => void,
} & InputProps;

type WithHandlers = {
  handleSaveClick: () => void,
  handleItalkiIdChange: (event: InputEvent) => void,
  handleEmailChange: (event: InputEvent) => void,
  handleSkypeChange: (event: InputEvent) => void,
  handleWeChatChange: (event: InputEvent) => void,
  handleErrorClose: () => void,
  handleSkypeLoginClose: () => void,
} & WithState;

type Props = {
  handleSaveClick: () => void,
  handleItalkiIdChange: (event: InputEvent) => void,
  // handleEmailChange: (event: InputEvent) => void,
  handleSkypeChange: (event: InputEvent) => void,
  handleSkypeLoginClose: () => void,
  handleSkypeLoginSuccess: () => void,
  // handleWeChatChange: (event: InputEvent) => void,
  onClose: () => void,
  processing: boolean,
  italkiId: number,
  open: boolean,
  skypeLoginOpen: boolean,
  viewer: {
    id: string,
    skypeUsername: string,
  },
};

const NewStudentForm = (props: Props) => (
  <div>
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle id="form-dialog-title">New Student</DialogTitle>
      <DialogContent style={styles.container}>
        <div style={styles.leftDiv}>
          <TextField
            autoFocus
            margin="dense"
            id="italkiId"
            label="Italki ID"
            onChange={props.handleItalkiIdChange}
            fullWidth
            disabled={props.processing}
          />
          {/*
          // TODO: Uncomment when feature is added
          <TextField
            margin="dense"
            label="Email Address (Optional)"
            type="email"
            id="email"
            onChange={props.handleEmailChange}
            fullWidth
          />
          */}
          <TextField
            margin="dense"
            label="Skype Account (Optional)"
            id="skype"
            onChange={props.handleSkypeChange}
            fullWidth
            disabled={props.processing}
          />
          {/*
          // TODO: Uncomment when feature is added
          <TextField
            margin="dense"
            label="WeChat Account (Optional)"
            id="wechat"
            onChange={props.handleWeChatChange}
            fullWidth
          />
          */}
        </div>
        <div style={styles.rightDiv}>
          <ItalkiAvatar italkiProfileId={props.italkiId} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={props.processing}
          onClick={props.onClose}
          color="primary"
        >
          Cancel
        </Button>
        <ProgressButton
          processing={props.processing}
          onClick={props.handleSaveClick}
        >
          Save
        </ProgressButton>
      </DialogActions>
    </Dialog>
    <SkypeLoginForm
      open={props.skypeLoginOpen}
      description="You need to be logged in Skype before adding a Skype student"
      onClose={props.handleSkypeLoginClose}
      onSuccess={props.handleSkypeLoginSuccess}
      viewer={props.viewer}
    />
  </div>
);

const enhance: HOC<*, InputProps> = compose(
  withState('italkiId', 'setItalkiId', ''),
  withState('email', 'setEmail', ''),
  withState('skype', 'setSkype', ''),
  withState('wechat', 'setWechat', ''),
  withState('processing', 'setProcessing', false),
  withState('skypeLoginOpen', 'setSkypeLoginOpen', false),
  withState('errorOpen', 'setErrorOpen', false),
  withState('errorMessage', 'setErrorMessage', ''),
  lifecycle({
    componentDidUpdate(prevProps: WithState) {
      if (!prevProps.open && this.props.open) {
        this.props.setItalkiId('');
        this.props.setSkype('');
      }
    },
  }),
  withHandlers({
    handleSaveClick: (props: WithState) => async () => {
      const configs = [
        {
          type: 'RANGE_ADD',
          connectionInfo: [
            {
              key: 'StudentCard_students',
              rangeBehavior: 'append',
            },
          ],
          edgeName: 'newStudentEdge',
          parentID: props.viewer.id,
        },
      ];

      try {
        if (Number.isNaN(Number(props.italkiId))) {
          throw Error('The italki ID must be a number.');
        }

        props.setProcessing(true);

        if (props.skype !== '') {
          const skypeToken = getSkypeToken();

          // The buffer makes sure that the token is valid for the whole request
          if (!skypeToken || skypeToken.expiration < Date.now() - 30000) {
            props.setSkypeLoginOpen(true);
            return;
          }
        }

        await addStudent(
          props.italkiId,
          props.skype,
          props.weChat,
          props.email,
          configs,
        );

        props.onClose();
      } catch (error) {
        props.setErrorMessage(error.toString());
        props.setErrorOpen(true);
      } finally {
        props.setProcessing(false);
      }
    },
    handleItalkiIdChange: ({setItalkiId}: WithState) => (event: InputEvent) => {
      setItalkiId(event.target.value);
    },
    handleEmailChange: ({setEmail}: WithState) => (event: InputEvent) => {
      setEmail(event.target.value);
    },
    handleSkypeChange: ({setSkype}: WithState) => (event: InputEvent) => {
      setSkype(event.target.value);
    },
    handleWeChatChange: ({setWeChat}: WithState) => (event: InputEvent) => {
      setWeChat(event.target.value);
    },
    handleSkypeLoginClose: ({setSkypeLoginOpen}: WithState) => () => {
      setSkypeLoginOpen(false);
    },
    handleErrorClose: ({setErrorOpen}: WithState) => () => {
      setErrorOpen(false);
    },
  }),
  withHandlers({
    handleSkypeLoginSuccess: (props: WithHandlers) => () => {
      props.setSkypeLoginOpen(false);
      props.handleSaveClick();
    },
  }),
  withError(({errorMessage, errorOpen, handleErrorClose}: WithHandlers) => ({
    message: errorMessage,
    open: errorOpen,
    onClose: handleErrorClose,
  })),
  pure,
);

const styles = {
  container: {
    display: 'flex',
  },
  leftDiv: {
    flex: 1,
  },
  rightDiv: {
    width: 200,
    height: 200,
    margin: 20,
  },
};

export default createFragmentContainer(
  enhance(NewStudentForm),
  graphql`
    fragment NewStudentForm_viewer on User {
      id
      ...SkypeLoginForm_viewer
    }
  `,
);
