/**
 * @prettier
 * @flow
 */

import React from 'react';
import {mount, shallow} from 'enzyme';

import App from './App';
import TopAppBar from './components/TopAppBar';
import LeftDrawer from './components/LeftDrawer';

describe('App', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it('opens the drawer when clicking on the hamburger button', () => {
    const wrapper = mount(<App />);
    wrapper.state().drawerOpen = false;
    wrapper.find(TopAppBar).prop('onHamburgerClick')();
    expect(wrapper.state().drawerOpen).toEqual(true);
  });

  it('opens the drawer when clicking in the drawer', () => {
    const wrapper = mount(<App />);
    wrapper.state().drawerOpen = true;
    wrapper.find(LeftDrawer).prop('onClose')();
    expect(wrapper.state().drawerOpen).toEqual(false);
  });
});
