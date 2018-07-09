/**
 * @prettier
 * @flow
 */

import React from 'react';
import type {HOC} from 'recompose';
import ResultSnackbar from '../ResultSnackbar';

type ErrorProps = {
  message: string,
  open: boolean,
  onClose: () => void,
};

type MapErrorProps = (props: any) => ErrorProps;

const withError = (
  mapErrorProps: MapErrorProps,
): HOC<*, *> => BaseComponent => (props: any) => {
  const {message, open, onClose} = mapErrorProps(props);

  return (
    <div>
      <BaseComponent {...props} />
      <ResultSnackbar
        message={message}
        open={open}
        onClose={onClose}
        type="success"
      />
    </div>
  );
};

export default withError;
