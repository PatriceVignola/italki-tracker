/**
 * @prettier
 * @flow
 */

import React from 'react';
import {shallow} from 'enzyme';

import TopAppBar from './TopAppBar';

describe('TopAppBar', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TopAppBar onHamburgerClick={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
