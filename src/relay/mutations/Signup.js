/**
 * @prettier
 * @flow
 */

import {commitMutation, graphql} from 'react-relay';
import environment from '../relayEnvironment';

type SignupData = {
  email: string,
  password: string,
};

type MutationResponse = {
  signup: {
    jwt: string,
  },
};

const mutation = graphql`
  mutation SignupMutation($data: SignupData!) {
    signup(data: $data) {
      jwt
    }
  }
`;

async function signup(data: SignupData) {
  const variables = {
    data: (data: Object),
  };

  return new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: ({signup}: MutationResponse, errors) => {
        if (errors) {
          reject(Error(errors[0].message));
        } else {
          localStorage.setItem('Authorization', `Bearer ${signup.jwt}`);
          resolve();
        }
      },
      onError: err => {
        reject(err);
      },
    });
  });
}

export default signup;
