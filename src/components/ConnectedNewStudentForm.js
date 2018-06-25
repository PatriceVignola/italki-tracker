/**
 * @prettier
 * @flow
 */

import {compose, withHandlers, withState} from 'recompose';

import NewStudentForm from './NewStudentForm';
import addStudent from '../relay/mutations/AddStudent';
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

const setHandlers = withHandlers({
  onSave: ({italkiId, skype, wechat, email, onClose}: Props) => async () => {
    // TODO: Add loading indicator and "Undo" snack on the page
    addStudent(italkiId, skype, wechat, email);

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
  withState('italkiId', 'setItalkiId', null),
  withState('email', 'setEmail', null),
  withState('skype', 'setSkype', null),
  withState('wechat', 'setWechat', null),
  setHandlers,
);

export default enhance(NewStudentForm);
