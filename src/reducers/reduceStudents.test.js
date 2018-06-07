/**
 * @prettier
 * @flow
 */

import reduceStudents from './reduceStudents';

describe('students reducer', () => {
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

  it('reduces students after FETCHED_STUDENTS', () => {
    const students = reduceStudents([], {
      type: 'FETCHED_STUDENTS',
      students: mockStudents,
    });

    expect(students).toEqual(mockStudents);
  });

  it('reduces students after ADD_STUDENT', () => {
    const newStudent = {
      italkiId: 2,
      name: 'NewStudent',
      sex: 'Male',
      location: 'Montreal, Canada',
      learningLanguages: [],
      languageSkills: [
        {
          language: 'Spanish',
          level: 2,
        },
      ],
    };

    const students = reduceStudents(mockStudents, {
      type: 'ADDED_STUDENT',
      student: newStudent,
    });

    expect(students).toEqual([...mockStudents, newStudent]);
  });
});
