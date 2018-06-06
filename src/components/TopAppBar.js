/**
 * @prettier
 * @flow
 */

import React from 'react';
import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

type Props = {
  onHamburgerClick: () => void,
};

function TopAppBar(props: Props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          style={styles.menuButton}
          onClick={props.onHamburgerClick}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" style={styles.title}>
          Italki Tracker
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    flex: 1,
  },
};

export default TopAppBar;
