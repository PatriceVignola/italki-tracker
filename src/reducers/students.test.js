/**
 * @prettier
 * @flow
 */

import reduceStudents from './reduceStudents';

describe('students reducer', () => {
  const mockStudents = [
    {
      id: 1,
      firstName: 'FirstName',
      lastName: 'LastName',
      photoUrl:
        'http://education.mnhs.org/immigration/sites/education.mnhs.org.immigration/files/imagecache/Full_800x800/MaleSilhouette_5.png',
    },
  ];
  it('reduces students after FETCHED_STUDENTS', () => {
    const students = reduceStudents([], {
      type: 'FETCHED_STUDENTS',
      students: mockStudents,
    });

    expect(students).toEqual(mockStudents);
  });
});
