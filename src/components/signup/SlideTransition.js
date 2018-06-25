/**
 * @prettier
 * @flow
 */

import React from 'react';
import {Transition} from 'react-transition-group';

type Props = {
  in?: boolean,
  children: any,
  duration: number,
  direction: 'left' | 'right',
  onTransitionOver?: () => void,
};

const defaultProps = {
  in: true,
  onTransitionOver: () => {},
};

function SlideTransition({
  children,
  duration,
  in: active,
  direction,
  onTransitionOver,
}: Props) {
  const defaultStyle = {
    transition: `${duration}ms ease-out`,
    transitionProperty: 'transform',
    position: 'absolute',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
  };

  const transitionStyles = {
    entering: {
      left: {
        transform: 'translateX(560px)',
      },
      right: {
        transform: 'translateX(-560px)',
      },
    },
    entered: {
      left: {},
      right: {},
    },
    exiting: {
      left: {
        transform: 'translateX(-560px)',
      },
      right: {
        transform: 'translateX(560px)',
      },
    },
  };

  // Wrap child node in <Transition />.
  return (
    <Transition
      in={active}
      mountOnEnter
      unmountOnExit
      addEndListener={(node, done) => {
        setTimeout(() => {
          done();
          onTransitionOver && onTransitionOver();
        }, duration);
      }}
    >
      {status => {
        if (status === 'exited' || status === 'unmounted') {
          return null;
        }

        return React.cloneElement(children, {
          style: {
            ...defaultStyle,
            ...transitionStyles[status][direction],
          },
        });
      }}
    </Transition>
  );
}

SlideTransition.defaultProps = defaultProps;

export default SlideTransition;
