/**
 * @prettier
 * @flow
 */

import React from 'react';
import {shallow} from 'enzyme';

import LeftDrawer from './LeftDrawer';

describe('LeftDrawer', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<LeftDrawer open onClose={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
