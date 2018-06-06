/**
 * @prettier
 * @flow
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchStudentsAsync from './fetchStudentsAsync';

const mockStore = configureStore([thunk]);

describe('fetchStudentsAsync', () => {
  it('fetches the student list', () => {
    const mockStudents = [
      {
        id: 1,
        firstName: 'FirstName',
        lastName: 'LastName',
        photoUrl:
          'http://education.mnhs.org/immigration/sites/education.mnhs.org.immigration/files/imagecache/Full_800x800/MaleSilhouette_5.png',
      },
    ];

    const store = mockStore({});

    return store.dispatch(fetchStudentsAsync()).then(() => {
      const expectedActions = store.getActions();
      expect(expectedActions).toHaveLength(1);
      expect(expectedActions).toContainEqual({
        type: 'FETCHED_STUDENTS',
        students: mockStudents,
      });
    });
  });
});
