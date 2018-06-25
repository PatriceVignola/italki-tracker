/**
 * @prettier
 * @flow
 */

import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import Dashboard from './components/Dashboard';
import SigninForm from './components/SigninForm';
import SignupForm from './components/SignupForm';

const baseUrl: string = (process.env.PUBLIC_URL: any);
const store = createStore(reducers, {}, applyMiddleware(thunk));

function App() {
  const authorizationHeader = localStorage.getItem('Authorization');

  if (!authorizationHeader || authorizationHeader.indexOf('Bearer ') !== 0) {
    return (
      <BrowserRouter basename={baseUrl}>
        <Switch>
          <Route exact path="/signin" component={SigninForm} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/" render={() => <Redirect to="/signin" />} />
        </Switch>
      </BrowserRouter>
    );
  }

  return (
    <Provider store={store}>
      <BrowserRouter basename={baseUrl}>
        <Switch>
          <Route path="/" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
