/**
 * @prettier
 * @flow
 */

import React from 'react';
import {shallow} from 'enzyme';

import StudentList from './StudentList';

describe('StudentList', () => {
  it('renders correctly', () => {
    const mockStudents = [
      {
        id: 1,
        firstName: 'FirstName',
        lastName: 'LastName',
        photoUrl:
          'http://education.mnhs.org/immigration/sites/education.mnhs.org.immigration/files/imagecache/Full_800x800/MaleSilhouette_5.png',
      },
    ];

    const wrapper = shallow(<StudentList students={mockStudents} />);
    expect(wrapper).toMatchSnapshot();
  });
});
