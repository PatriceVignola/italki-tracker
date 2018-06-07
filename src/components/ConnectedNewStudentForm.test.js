/**
 * @prettier
 * @flow
 */

import React from 'react';
import {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ConnectedNewStudentForm from './ConnectedNewStudentForm';
import NewStudentForm from './NewStudentForm';
import saveNewStudentAsync from '../actions/saveNewStudentAsync';

jest.mock('../actions/saveNewStudentAsync', () =>
  jest.fn().mockImplementation(() => async dispatch => {
    dispatch({
      type: 'ADDED_STUDENT',
      students: [],
    });
  }),
);

const mockStore = configureStore([thunk]);

describe('ConnectedNewStudentForm', () => {
  const mockStudent = {
    italkiId: 123456789,
    email: 'dummy.email@dummy.com',
    skype: 'DummySkypeAccount',
    wechat: 'DummyWechatAccount',
    name: 'DummyName',
    sex: 'Male',
    location: 'DummyLocation',
    learningLanguages: [],
    languageSkills: [],
  };

  let wrapper;

  beforeEach(() => {
    const store = mockStore({});
    wrapper = mount(
      <ConnectedNewStudentForm open store={store} onClose={jest.fn()} />,
    );
  });

  it('updates italkiId when the input value has been changed', () => {
    wrapper.find(NewStudentForm).prop('onItalkiIdChange')({
      target: {
        value: mockStudent.italkiId.toString(),
      },
    });

    wrapper.update();
    expect(wrapper.find(NewStudentForm).props().italkiId).toEqual(
      mockStudent.italkiId,
    );
  });

  it('updates email when the input value has been changed', () => {
    wrapper.find(NewStudentForm).prop('onEmailChange')({
      target: {
        value: mockStudent.email,
      },
    });

    wrapper.update();
    expect(wrapper.find(NewStudentForm).props().email).toEqual(
      mockStudent.email,
    );
  });

  it('updates skype when the input value has been changed', () => {
    wrapper.find(NewStudentForm).prop('onSkypeChange')({
      target: {
        value: mockStudent.skype,
      },
    });

    wrapper.update();
    expect(wrapper.find(NewStudentForm).props().skype).toEqual(
      mockStudent.skype,
    );
  });

  it('updates wechat when the input value has been changed', () => {
    wrapper.find(NewStudentForm).prop('onWechatChange')({
      target: {
        value: mockStudent.wechat,
      },
    });

    wrapper.update();
    expect(wrapper.find(NewStudentForm).props().wechat).toEqual(
      mockStudent.wechat,
    );
  });

  it('sends saveNewStudentAsync() when onSave() has been requested', () => {
    const mockSaveFunction = jest.fn();
    wrapper.find(NewStudentForm).props().saveNewStudent = mockSaveFunction;

    wrapper.find(NewStudentForm).prop('setItalkiId')(mockStudent.italkiId);
    wrapper.find(NewStudentForm).prop('setEmail')(mockStudent.email);
    wrapper.find(NewStudentForm).prop('setSkype')(mockStudent.skype);
    wrapper.find(NewStudentForm).prop('setWechat')(mockStudent.wechat);

    wrapper.find(NewStudentForm).prop('onSave')();

    expect(saveNewStudentAsync).toHaveBeenCalledTimes(1);
    expect(saveNewStudentAsync).toBeCalledWith(mockStudent);
    expect(wrapper.find(NewStudentForm).prop('onClose')).toHaveBeenCalled();
  });
});
