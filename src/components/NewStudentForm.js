/**
 * @prettier
 * @flow
 */

import React from 'react';
import {compose, withHandlers, withState, mapProps} from 'recompose';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core/';
import type {HOC} from 'recompose';

import addStudent from '../relay/mutations/AddStudent';
import ItalkiAvatar from './ItalkiAvatar';
import withError from './hoc/withError';

type InputEvent = {
  target: {
    value: string,
  },
};

type InputProps = {
  onClose: () => void,
  open: boolean,
  viewerId: string,
};

type WithState = {
  italkiId: number,
  email: string,
  skype: string,
  weChat: string,
  errorOpen: boolean,
  errorMessage: string,
  setItalkiId: (italkiId: number) => void,
  setEmail: (email: string) => void,
  setSkype: (skype: string) => void,
  setWeChat: (weChat: string) => void,
  setErrorOpen: (open: boolean) => void,
  setErrorMessage: (message: string) => void,
} & InputProps;

type WithHandlers = {
  handleSaveClick: () => void,
  handleItalkiIdChange: (event: InputEvent) => void,
  handleEmailChange: (event: InputEvent) => void,
  handleSkypeChange: (event: InputEvent) => void,
  handleWeChatChange: (event: InputEvent) => void,
  handleErrorClose: () => void,
} & WithState;

type Props = {
  handleSaveClick: () => void,
  handleItalkiIdChange: (event: InputEvent) => void,
  // handleEmailChange: (event: InputEvent) => void,
  handleSkypeChange: (event: InputEvent) => void,
  // handleWeChatChange: (event: InputEvent) => void,
  onClose: () => void,
  italkiId: number,
  open: boolean,
};

function NewStudentForm(props: Props) {
  return (
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
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.handleSaveClick} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const enhance: HOC<*, InputProps> = compose(
  withState('italkiId', 'setItalkiId', ''),
  withState('email', 'setEmail', ''),
  withState('skype', 'setSkype', ''),
  withState('wechat', 'setWechat', ''),
  withState('errorOpen', 'setErrorOpen', false),
  withState('errorMessage', 'setErrorMessage', ''),
  withHandlers({
    handleSaveClick: (props: WithState) => async () => {
      // TODO: Add loading indicator and "Undo" snack on the page
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
          parentID: props.viewerId,
        },
      ];

      try {
        if (Number.isNaN(props.italkiId)) {
          throw Error('The italki ID must be a number.');
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
      }
    },
    handleItalkiIdChange: ({setItalkiId}: WithState) => (event: InputEvent) => {
      // TODO: Check if only integers
      setItalkiId(parseInt(event.target.value, 10));
    },
    handleEmailChange: ({setEmail}: WithState) => (event: InputEvent) => {
      // TODO: Check if email format
      setEmail(event.target.value);
    },
    handleSkypeChange: ({setSkype}: WithState) => (event: InputEvent) => {
      setSkype(event.target.value);
    },
    handleWeChatChange: ({setWeChat}: WithState) => (event: InputEvent) => {
      setWeChat(event.target.value);
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
  mapProps((props: WithHandlers) => ({
    handleSaveClick: props.handleSaveClick,
    handleItalkiIdChange: props.handleItalkiIdChange,
    handleEmailChange: props.handleEmailChange,
    handleSkypeChange: props.handleSkypeChange,
    handleWeChatChange: props.handleWeChatChange,
    italkiId: props.italkiId,
    onClose: props.onClose,
    open: props.open,
  })),
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

export default enhance(NewStudentForm);
