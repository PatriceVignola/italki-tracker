/**
 * @prettier
 * @flow
 */

import React from 'react';
import {shallow} from 'enzyme';

import StudentCard from './StudentCard';

describe('StudentCard', () => {
  it('renders correctly', () => {
    const mockStudent = {
      italkiId: 1,
      name: 'Etienne',
      sex: 'Male',
      location: 'Montreal, Canada',
      learningLanguages: [],
      languageSkills: [
        {
          language: 'English',
          level: 1,
        },
      ],
    };

    const wrapper = shallow(<StudentCard student={mockStudent} />);
    expect(wrapper).toMatchSnapshot();
  });
});
