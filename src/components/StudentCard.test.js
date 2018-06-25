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
      avatarUrl: 'https://avatarurll.com',
      nickname: 'dummy',
      languages: [
        {
          id: 1,
          name: 'spanish',
        },
        {
          id: 2,
          name: 'english',
        },
      ],
    };

    const wrapper = shallow(
      <StudentCard
        avatarUrl={mockStudent.avatarUrl}
        languages={mockStudent.languages}
        nickname={mockStudent.nickname}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
