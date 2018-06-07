/**
 * @prettier
 * @flow
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import saveNewStudentAsync from './saveNewStudentAsync';

const mockStore = configureStore([thunk]);

describe('saveNewStudentAsync', () => {
  it('adds a new student', () => {
    const mockStudent = {
      italkiId: 1,
      languageSkills: [{language: 'English', level: 1}],
      learningLanguages: [],
      location: 'Montreal, Canada',
      name: 'Etienne',
      sex: 'Male',
    };

    const store = mockStore({});

    return store.dispatch(saveNewStudentAsync(mockStudent)).then(() => {
      const expectedActions = store.getActions();
      expect(expectedActions).toHaveLength(1);
      expect(expectedActions).toContainEqual({
        type: 'ADDED_STUDENT',
        student: mockStudent,
      });
    });
  });
});
