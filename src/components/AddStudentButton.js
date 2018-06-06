/**
 * @prettier
 * @flow
 */

import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

function AddStudentButton(props: any) {
  return (
    <Button {...props} variant="fab" color="secondary" aria-label="add">
      <AddIcon />
    </Button>
  );
}

export default AddStudentButton;
