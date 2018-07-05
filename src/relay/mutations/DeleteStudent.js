/**
 * @prettier
 * @flow
 */

import {commitMutation, graphql} from 'react-relay';
import environment from '../relayEnvironment';

type MutationResponse = {
  deleteStudent: {
    deletedStudentId: string,
  },
};

const mutation = graphql`
  mutation DeleteStudentMutation($input: DeleteStudentData!) {
    deleteStudent(data: $input) {
      deletedStudentId
    }
  }
`;

async function deleteStudent(input: {id: string}, configs?: any) {
  const variables = {
    input: {...input},
  };

  return new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables,
      configs,
      onCompleted: (response: MutationResponse, errors) => {
        if (!errors) {
          resolve(response.deleteStudent.deletedStudentId);
        } else {
          reject(Error(errors[0].message));
        }
      },
      onError: err => {
        reject(err);
      },
    });
  });
}

export default deleteStudent;
