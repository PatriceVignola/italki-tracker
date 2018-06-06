/**
 * @prettier
 * @flow
 */

export type Student = {
  id: number,
  firstName: string,
  lastName: string,
  photoUrl: string,
};

export type Action = {type: 'FETCHED_STUDENTS', students: Student[]};
export type ThunkAction = (dispatch: (Action) => void) => Promise<void>;
