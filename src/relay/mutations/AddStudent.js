/**
 * @prettier
 * @flow
 */

import {commitMutation, graphql} from 'react-relay';
import environment from '../relayEnvironment';

type MutationResponse = {
  addStudent: {
    newStudentEdge: {
      node: {
        id: string,
        italkiProfile: {
          languages: {
            id: number,
            name: string,
          },
          nickname: string,
          avatarUrl: string,
        },
      },
    },
  },
};

const mutation = graphql`
  mutation AddStudentMutation($input: AddStudentData!) {
    addStudent(data: $input) {
      newStudentEdge {
        node {
          id
          italkiProfile {
            languages(learning: true) {
              id
              name
            }
            nickname
            avatarUrl
          }
        }
      }
    }
  }
`;

async function addStudent(
  italkiId: number,
  skypeUsername: ?string,
  weChatUsername: ?string,
  email: ?string,
  configs?: any,
) {
  const variables = {
    input: {italkiId, skypeUsername, weChatUsername, email},
  };

  return new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables,
      configs,
      onCompleted: (response: MutationResponse, errors) => {
        if (!errors) {
          resolve(response.addStudent.newStudentEdge.node.id);
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
