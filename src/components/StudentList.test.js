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
      },
    ];

    const wrapper = shallow(
      <StudentList
        students={mockStudents}
        newStudentFormOpen
        onAddStudentClick={jest.fn()}
        onNewStudentFormClose={jest.fn()}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
