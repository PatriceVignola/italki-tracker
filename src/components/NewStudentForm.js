/**
 * @prettier
 * @flow
 */

import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core/';

type Props = {
  open?: boolean,
  onClose: () => void,
  onSave: () => void,
  onItalkiIdChange: (e: Object) => void,
  onEmailChange: (e: Object) => void,
  onSkypeChange: (e: Object) => void,
  onWechatChange: (e: Object) => void,
};

const defaultProps = {
  open: false,
};

function NewStudentForm(props: Props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">New Student</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="italkiId"
          label="Italki ID"
          onChange={props.onItalkiIdChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Email Address"
          type="email"
          id="email"
          onChange={props.onEmailChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Skype Account"
          id="skype"
          onChange={props.onSkypeChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="WeChat Account"
          id="wechat"
          onChange={props.onWechatChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

NewStudentForm.defaultProps = defaultProps;

export default NewStudentForm;
