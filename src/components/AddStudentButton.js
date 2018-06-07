/**
 * @prettier
 * @flow
 */

import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

type Props = {
  onClick: () => void,
};

function AddStudentButton(props: Props) {
  return (
    <Button
      {...props}
      onClick={props.onClick}
      variant="fab"
      color="secondary"
      aria-label="add"
    >
      <AddIcon />
    </Button>
  );
}

export default AddStudentButton;
