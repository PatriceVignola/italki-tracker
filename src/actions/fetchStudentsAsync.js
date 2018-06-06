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
          id: 1,
          firstName: 'FirstName',
          lastName: 'LastName',
          photoUrl:
            'http://education.mnhs.org/immigration/sites/education.mnhs.org.immigration/files/imagecache/Full_800x800/MaleSilhouette_5.png',
        },
      ],
    });
  };
}

export default fetchStudentsAsync;
