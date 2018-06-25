/**
 * @prettier
 * @flow
 */

import React from 'react';
import type {HOC} from 'recompose';
import ErrorSnackbar from '../ErrorSnackbar';

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
      <ErrorSnackbar message={message} open={open} onClose={onClose} />
    </div>
  );
};

export default withError;
