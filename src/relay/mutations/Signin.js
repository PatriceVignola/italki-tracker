/**
 * @prettier
 * @flow
 */

import {commitMutation, graphql} from 'react-relay';
import environment from '../relayEnvironment';

type SigninData = {
  email: string,
  password: string,
};

type MutationResponse = {
  signin: {
    jwt: string,
  },
};

const mutation = graphql`
  mutation SigninMutation($data: SigninData!) {
    signin(data: $data) {
      jwt
    }
  }
`;

async function signin(data: SigninData) {
  const variables = {
    data: (data: Object),
  };

  return new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: ({signin}: MutationResponse, errors) => {
        if (errors) {
          reject(Error(errors[0].message));
        } else {
          localStorage.setItem('Authorization', `Bearer ${signin.jwt}`);
          resolve();
        }
      },
      onError: err => {
        reject(err);
      },
    });
  });
}

export default signin;
