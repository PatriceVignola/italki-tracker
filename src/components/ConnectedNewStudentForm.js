/**
 * @prettier
 * @flow
 */

import {connect} from 'react-redux';
import {compose, withHandlers, withState} from 'recompose';

import NewStudentForm from './NewStudentForm';
import saveNewStudentAsync from '../actions/saveNewStudentAsync';
import type {Student} from '../actions/types';

type Props = {
  saveNewStudent: (student: Student) => void,
  onClose: () => void,
  setItalkiId: (id: number) => void,
  setEmail: (email: string) => void,
  setSkype: (account: string) => void,
  setWechat: (account: string) => void,
  italkiId: number,
  email: string,
  skype: string,
  wechat: string,
};

type InputEvent = {
  target: {
    value: string,
  },
};

const connectToStore = connect(
  () => ({}),
  {
    saveNewStudent: saveNewStudentAsync,
  },
);

const setHandlers = withHandlers({
  onSave: ({italkiId, email, skype, wechat, saveNewStudent, onClose}: Props) => () => {
    // TODO: Add loading indicator and "Undo" snack on the page

    // TODO: Fetch name, sex, location, photoUrl, learningLanguages,
    // languageSkills from https://www.italki.com/user/4981462
    saveNewStudent({
      italkiId,
      email,
      skype,
      wechat,
      name: 'DummyName',
      sex: 'Male',
      location: 'DummyLocation',
      learningLanguages: [],
      languageSkills: [],
    });

    onClose();
  },
  onItalkiIdChange: ({setItalkiId}: Props) => (e: InputEvent) => {
    // TODO: Check if only integers
    setItalkiId(parseInt(e.target.value, 10));
  },
  onEmailChange: ({setEmail}: Props) => (e: InputEvent) => {
    // TODO: Check if email format
    setEmail(e.target.value);
  },
  onSkypeChange: ({setSkype}: Props) => (e: InputEvent) => {
    setSkype(e.target.value);
  },
  onWechatChange: ({setWechat}: Props) => (e: InputEvent) => {
    setWechat(e.target.value);
  },
});

const enhance = compose(
  connectToStore,
  withState('italkiId', 'setItalkiId', null),
  withState('email', 'setEmail', null),
  withState('skype', 'setSkype', null),
  withState('wechat', 'setWechat', null),
  setHandlers,
);

export default enhance(NewStudentForm);
