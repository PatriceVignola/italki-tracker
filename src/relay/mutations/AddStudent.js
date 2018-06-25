/**
 * @prettier
 * @flow
 */

import {commitMutation, graphql} from 'react-relay';
import environment from '../relayEnvironment';

type MutationResponse = {
  addStudent: {
    id: string,
  },
};

const mutation = graphql`
  mutation AddStudentMutation($input: AddStudentData!) {
    addStudent(data: $input) {
      id
    }
  }
`;

// https://medium.com/entria/wrangling-the-client-store-with-the-relay-modern-updater-function-5c32149a71ac
// https://medium.com/@tamis.mike/relay-mutation-updater-part-1-basic-reading-and-editing-c2789c111c75

const updater = proxyStore => {
  /*
  const payloadProxy = proxyStore.getRootField('addStudent');
  const studentProxy = payloadProxy.getLinkedRecord('student');
  */
};

async function addStudent(
  italkiId: number,
  skypeUsername: ?string,
  weChatUsername: ?string,
  email: ?string,
) {
  const variables = {
    input: {italkiId, skypeUsername, weChatUsername, email},
  };

  return new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables,
      updater,
      onCompleted: (response: MutationResponse, errors) => {
        if (!errors) {
          resolve(response.addStudent.id);
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

export default addStudent;
