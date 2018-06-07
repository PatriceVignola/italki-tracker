/**
 * @prettier
 * @flow
 */

// TODO: Add an enum for languages
export type Student = {
  italkiId: number,
  name: string,
  sex: 'Male' | 'Female',
  location: string,
  learningLanguages: string[],
  languageSkills: {
    language: string,
    level: 1 | 2 | 3 | 4 | 5,
  }[],
  email?: string,
  skype?: string,
  wechat?: string,
  photoUrl?: string,
};

export type Action =
  | {type: 'FETCHED_STUDENTS', students: Student[]}
  | {type: 'ADDED_STUDENT', student: Student};

export type ThunkAction = (dispatch: (Action) => void) => Promise<void>;
