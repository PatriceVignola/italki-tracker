/**
 * @prettier
 * @flow
 */

import React from 'react';
import {shallow} from 'enzyme';

import AddStudentButton from './AddStudentButton';

describe('AddStudentButton', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<AddStudentButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
