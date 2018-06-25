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
});
