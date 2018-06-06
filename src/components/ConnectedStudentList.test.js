/**
 * @prettier
 * @flow
 */

import React from 'react';
import {mount, shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ConnectedStudentList from './ConnectedStudentList';
import fetchStudentsAsync from '../actions/fetchStudentsAsync';

jest.mock('../actions/fetchStudentsAsync', () =>
  jest.fn().mockImplementation(() => async dispatch => {
    dispatch({});
  }),
);

const mockStore = configureStore([thunk]);

describe('ConnectedStudentList', () => {
  it("has props that match the store's initial state", () => {
    const mockStudents = [
      {
        id: 1,
        firstName: 'FirstName',
        lastName: 'LastName',
        photoUrl:
          'http://education.mnhs.org/immigration/sites/education.mnhs.org.immigration/files/imagecache/Full_800x800/MaleSilhouette_5.png',
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
});
