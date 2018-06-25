/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Button, CircularProgress} from '@material-ui/core/';
import {withStyles} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import type {Node} from 'react';
import type {HOC} from 'recompose';

type InputProps = {
  processing?: boolean,
  children: Node,
  onClick?: () => void,
};

type WithStyles = {
  classes: {
    wrapper: {[string]: mixed},
    buttonProgress: {[string]: mixed},
  },
};

type Props = InputProps & WithStyles;

const ProgressButton = ({classes, processing, children, onClick}: Props) => (
  <div className={classes.wrapper}>
    <Button
      variant="contained"
      color="primary"
      disabled={processing}
      onClick={onClick}
    >
      {children}
    </Button>
    {processing && (
      <CircularProgress size={24} className={classes.buttonProgress} />
    )}
  </div>
);

const enhance: HOC<*, InputProps> = withStyles(theme => ({
  wrapper: {
    position: 'relative',
    margin: theme.spacing.unit,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default enhance(ProgressButton);
