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

import ItalkiAvatar from './ItalkiAvatar';

type Props = {
  open?: boolean,
  onClose: () => void,
  onSave: () => void,
  onItalkiIdChange: (e: Object) => void,
  onEmailChange: (e: Object) => void,
  onSkypeChange: (e: Object) => void,
  onWechatChange: (e: Object) => void,
  italkiId: number,
};

const defaultProps = {
  open: false,
};

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
            onChange={props.onItalkiIdChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email Address (Optional)"
            type="email"
            id="email"
            onChange={props.onEmailChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Skype Account (Optional)"
            id="skype"
            onChange={props.onSkypeChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="WeChat Account (Optional)"
            id="wechat"
            onChange={props.onWechatChange}
            fullWidth
          />
        </div>
        <div style={styles.rightDiv}>
          <ItalkiAvatar italkiProfileId={props.italkiId} />
        </div>
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
