/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Avatar, IconButton, Menu, MenuItem} from '@material-ui/core';
import {withHandlers, withState, compose, mapProps} from 'recompose';
import type {HOC} from 'recompose';

type ClickEvent = {
  currentTarget: any,
};

type WithState = {
  setAnchorEl: (element: any) => void,
  anchorEl: any,
};

type WithHandlers = {
  handleClick: (event: ClickEvent) => void,
  handleClose: () => void,
  handleSignoutClick: () => void,
} & WithState;

type Props = {
  handleClick: (event: ClickEvent) => void,
  handleClose: () => void,
  handleSignoutClick: () => void,
  anchorEl: any,
};

function UserProfileMenu(props: Props) {
  return (
    <div>
      <IconButton onClick={props.handleClick}>
        <Avatar
          style={styles.avatar}
          alt="Profile Picture"
          src="https://www.italki.com/static/images/no_pic150.jpg"
        />
      </IconButton>
      <Menu
        anchorEl={props.anchorEl}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        open={props.anchorEl !== null}
        onClose={props.handleClose}
      >
        <MenuItem onClick={props.handleSignoutClick}>Sign out</MenuItem>
      </Menu>
    </div>
  );
}

const styles = {
  avatar: {
    width: 32,
    height: 32,
  },
};

const enhance: HOC<*, {}> = compose(
  withState('anchorEl', 'setAnchorEl', null),
  withHandlers({
    handleClick: ({setAnchorEl}: WithState) => (event: ClickEvent) => {
      setAnchorEl(event.currentTarget);
    },
    handleClose: ({setAnchorEl}: WithState) => () => {
      setAnchorEl(null);
    },
    handleSignoutClick: ({setAnchorEl}: WithState) => () => {
      localStorage.clear();
      setAnchorEl(null);
      window.location.href = process.env.PUBLIC_URL;
    },
  }),
  mapProps((props: WithHandlers) => ({
    handleClick: props.handleClick,
    handleClose: props.handleClose,
    handleSignoutClick: props.handleSignoutClick,
    anchorEl: props.anchorEl,
  })),
);

export default enhance(UserProfileMenu);
