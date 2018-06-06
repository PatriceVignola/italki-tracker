/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import type {Store} from 'redux';

import reducers from './reducers';
import LeftDrawer from './components/LeftDrawer';
import TopAppBar from './components/TopAppBar';
import StudentListScreen from './components/ConnectedStudentList';
import type {Action} from './actions/types';

const initialState = {};

type State = {
  drawerOpen: boolean,
};

class App extends React.Component<{}, State> {
  store: Store<Object, Action>;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;

  constructor() {
    super();

    this.store = createStore(reducers, initialState, applyMiddleware(thunk));

    this.state = {
      drawerOpen: false,
    };

    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleDrawerOpen() {
    this.setState({drawerOpen: true});
  }

  handleDrawerClose() {
    this.setState({drawerOpen: false});
  }

  render() {
    const baseUrl: string = (process.env.PUBLIC_URL: any);

    return (
      <Provider store={this.store}>
        <BrowserRouter basename={baseUrl}>
          <div>
            <TopAppBar onHamburgerClick={this.handleDrawerOpen} />
            <LeftDrawer
              open={this.state.drawerOpen}
              onClose={this.handleDrawerClose}
            />
            <Switch>
              <Route exact path="/" component={StudentListScreen} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
