/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import type {Store} from 'redux';

import reducers from './reducers';
import StudentListScreen from './components/ConnectedStudentList';
import type {Action} from './actions/types';

const initialState = {};

class App extends React.Component<{}> {
  store: Store<Object, Action>;

  constructor() {
    super();

    this.store = createStore(
      reducers,
      initialState,
      applyMiddleware(thunk),
    );
  }

  render() {
    const baseUrl: string = (process.env.PUBLIC_URL: any);

    return (
      <Provider store={this.store}>
        <BrowserRouter basename={baseUrl}>
          <div>
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
