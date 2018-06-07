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
        italkiId: 1,
        languageSkills: [{language: 'English', level: 1}],
        learningLanguages: [],
        location: 'Montreal, Canada',
        name: 'Etienne',
        sex: 'Male',
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
