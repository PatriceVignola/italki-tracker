/**
 * @prettier
 * @flow
 */

import React from 'react';
import {mount, shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ConnectedStudentList from './ConnectedStudentList';
import ConnectedNewStudentForm from './ConnectedNewStudentForm';
import StudentList from './StudentList';
import AddStudentButton from './AddStudentButton';
import fetchStudentsAsync from '../actions/fetchStudentsAsync';

jest.mock('../actions/fetchStudentsAsync', () =>
  jest.fn().mockImplementation(() => async dispatch => {
    dispatch({
      type: 'FETCHED_STUDENTS',
      students: [],
    });
  }),
);

jest.mock('./ConnectedNewStudentForm', () => () => <div open={false} />);

const mockStore = configureStore([thunk]);

describe('ConnectedStudentList', () => {
  it("has props that match the store's initial state", () => {
    const mockStudents = [
      {
        italkiId: 1,
        firstName: 'FirstName',
        lastName: 'LastName',
      },
    ];

    const store = mockStore({students: mockStudents});
    const wrapper = shallow(<ConnectedStudentList store={store} />);
    expect(wrapper.props().students).toEqual(mockStudents);
  });

  it('fetches students after mounting', () => {
    const store = mockStore({students: []});
    mount(<ConnectedStudentList store={store} />);
    expect(fetchStudentsAsync).toHaveBeenCalledTimes(1);
  });

  it('opens the new student form when clicking on the FAB', () => {
    const store = mockStore({students: []});
    const wrapper = mount(<ConnectedStudentList store={store} />);
    wrapper.find(StudentList).props().newStudentFormOpen = false;
    wrapper.find(AddStudentButton).prop('onClick')();
    wrapper.update();
    expect(wrapper.find(StudentList).props().newStudentFormOpen).toEqual(true);
  });

  it('closes the new student form when the form requested it', () => {
    const store = mockStore({students: []});
    const wrapper = mount(<ConnectedStudentList store={store} />);
    wrapper.find(StudentList).props().newStudentFormOpen = true;
    wrapper.find(ConnectedNewStudentForm).prop('onClose')();
    wrapper.update();
    expect(wrapper.find(StudentList).props().newStudentFormOpen).toEqual(false);
  });
});
