/**
 * @prettier
 * @flow
 */

import React from 'react';
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';

import PeopleIcon from '@material-ui/icons/People';

type Props = {
  open: boolean,
  onClose: () => void,
};

function LeftDrawer(props: Props) {
  return (
    <Drawer open={props.open} onClose={props.onClose}>
      <div
        tabIndex={0}
        role="button"
        onClick={props.onClose}
        onKeyDown={props.onClose}
      >
        <List style={styles.list}>
          <ListItem style={styles.title}>
            <Typography variant="title">
              Italki Tracker
            </Typography>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Students" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}

const styles = {
  list: {
    minWidth: 300,
  },
  title: {
    marginTop: 5,
    marginBottom: 10,
  },
};

export default LeftDrawer;
