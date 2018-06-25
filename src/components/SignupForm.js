/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {Paper} from '@material-ui/core/';
import {TransitionGroup} from 'react-transition-group';
import {withState, withHandlers, pure, compose, mapProps} from 'recompose';
import type {HOC} from 'recompose';

import CreateAccountPage from './signup/CreateAccountPage';
import LinkSkypeAccountPage from './signup/LinkSkypeAccountPage';
import SlideTransition from './signup/SlideTransition';
import withError from './hoc/withError';

type InputProps = {
  history: {
    replace: (path: string) => void,
  },
  location: {
    key: string,
  },
};

type WithState = {
  animating: boolean,
  errorMessage: string,
  errorOpen: boolean,
  setAnimating: (animating: boolean) => void,
  setErrorMessage: (message: string) => void,
  setErrorOpen: (open: boolean) => void,
} & InputProps;

type WithHandlers = {
  handleLinkCompleted: () => void,
  handleCreateCompleted: () => void,
  handleTransitionOver: () => void,
  handlePageError: () => void,
  handleErrorClose: () => void,
} & WithState;

type Props = {
  location: {
    key: string,
  },
  handleLinkCompleted: () => void,
  handleCreateCompleted: () => void,
  handleTransitionOver: () => void,
  handlePageError: () => void,
};

function SignupForm(props: Props) {
  return (
    <div style={styles.container}>
      <Paper elevation={4} style={styles.signupForm}>
        <TransitionGroup>
          <SlideTransition
            duration={250}
            key={props.location.key}
            direction="left"
            onTransitionOver={props.handleTransitionOver}
          >
            <div>
              <div style={styles.switchContainer}>
                {/* $FlowFixMe We need the location props for the slide anim */}
                <Switch location={props.location}>
                  <Route exact path="/signup">
                    <CreateAccountPage
                      onCompleted={props.handleCreateCompleted}
                      onError={props.handlePageError}
                    />
                  </Route>
                  <Route exact path="/signup/skype">
                    <LinkSkypeAccountPage
                      onCompleted={props.handleLinkCompleted}
                      onError={props.handlePageError}
                    />
                  </Route>
                </Switch>
              </div>
            </div>
          </SlideTransition>
        </TransitionGroup>
      </Paper>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupForm: {
    width: 500,
    border: 1,
    height: 225,
    padding: 30,
    overflow: 'hidden',
    position: 'relative',
  },
  switchContainer: {
    width: 500,
    position: 'relative',
  },
};

const enhance: HOC<*, InputProps> = compose(
  withState('animating', 'setAnimating', false),
  withState('errorMessage', 'setErrorMessage', ''),
  withState('errorOpen', 'setErrorOpen', false),
  withHandlers({
    handleLinkCompleted: ({history}: WithState) => () => {
      window.location.href = '/';
    },
    handleCreateCompleted: (props: WithState) => () => {
      if (!props.animating) {
        props.history.replace('/signup/skype');
        props.setAnimating(true);
      }
    },
    handleTransitionOver: ({setAnimating}: WithState) => () => {
      setAnimating(false);
    },
    handlePageError: (props: WithState) => (error: Error) => {
      props.setErrorMessage(error.toString());
      props.setErrorOpen(true);
    },
    handleErrorClose: ({setErrorOpen}: WithState) => () => {
      setErrorOpen(false);
    },
  }),
  withError(({errorMessage, errorOpen, handleErrorClose}: WithHandlers) => ({
    message: errorMessage,
    open: errorOpen,
    onClose: handleErrorClose,
  })),
  mapProps((props: WithHandlers) => ({
    location: props.location,
    handleLinkCompleted: props.handleLinkCompleted,
    handleCreateCompleted: props.handleCreateCompleted,
    handleTransitionOver: props.handleTransitionOver,
    handlePageError: props.handlePageError,
  })),
  pure,
);

export default withRouter(enhance(SignupForm));
