/**
 * @prettier
 * @flow
 */

import {compose, withState, withHandlers} from 'recompose';

import LeftDrawer from './LeftDrawer';

type Props = {
  setOpen: (state: boolean) => void,
};

const setState = withState('open', 'setOpen', true);

const setHandlers = withHandlers({
  handleClose: (props: Props) => () => {
    props.setOpen(false);
  },
});

const enhance = compose(
  setState,
  setHandlers,
);

export default enhance(LeftDrawer);
