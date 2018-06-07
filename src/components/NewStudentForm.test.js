/**
 * @prettier
 * @flow
 */

import React from 'react';
import {shallow} from 'enzyme';

import NewStudentForm from './NewStudentForm';

describe('NewStudentForm', () => {
  it('renders correctly', () => {
    const mockProps = {
      open: true,
      onClose: () => {},
      onSave: () => {},
      onItalkiIdChange: () => {},
      onEmailChange: () => {},
      onSkypeChange: () => {},
      onWechatChange: () => {},
    };

    const wrapper = shallow(<NewStudentForm {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
