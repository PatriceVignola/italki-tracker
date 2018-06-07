/**
 * @prettier
 * @flow
 */

import type {ThunkAction} from './types';

function fetchStudentsAsync(): ThunkAction {
  return async dispatch => {
    // TODO: Do a real fetch here
    dispatch({
      type: 'FETCHED_STUDENTS',
      students: [
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
      ],
    });
  };
}

export default fetchStudentsAsync;
