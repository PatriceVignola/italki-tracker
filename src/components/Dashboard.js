/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {withState, withHandlers, mapProps, compose} from 'recompose';
import type {HOC} from 'recompose';

import LeftDrawer from './LeftDrawer';
import TopAppBar from './TopAppBar';
import StudentListPage from './StudentListPage';

type WithState = {
  drawerOpen: boolean,
  setDrawerOpen: (open: boolean) => void,
};

type WithHandlers = {
  handleOpenDrawer: () => void,
  handleCloseDrawer: () => void,
} & WithState;

type Props = {
  drawerOpen: boolean,
  handleOpenDrawer: () => void,
  handleCloseDrawer: () => void,
};

function Dashboard({drawerOpen, handleOpenDrawer, handleCloseDrawer}: Props) {
  return (
    <div>
      <TopAppBar onHamburgerClick={handleOpenDrawer} />
      <LeftDrawer open={drawerOpen} onClose={handleCloseDrawer} />
      <Switch>
        <Route exact path="/students" component={StudentListPage} />
        <Route path="/">
          <Redirect to="/students" />
        </Route>
      </Switch>
    </div>
  );
}

const enhance: HOC<*, {}> = compose(
  withState('drawerOpen', 'setDrawerOpen', false),
  withHandlers({
    handleOpenDrawer: ({setDrawerOpen}: WithState) => () => {
      setDrawerOpen(true);
    },
    handleCloseDrawer: ({setDrawerOpen}: WithState) => () => {
      setDrawerOpen(false);
    },
  }),
  mapProps((props: WithHandlers) => ({
    drawerOpen: props.drawerOpen,
    handleOpenDrawer: props.handleOpenDrawer,
    handleCloseDrawer: props.handleCloseDrawer,
  })),
);

export default enhance(Dashboard);
