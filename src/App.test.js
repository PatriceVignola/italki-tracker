/**
 * @prettier
 * @flow
 */

import React from 'react';
import {shallow} from 'enzyme';

import App from './App';

describe('App', () => {
  it('renders correctly when PUBLIC_URL is set', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
