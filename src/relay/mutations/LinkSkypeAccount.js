/**
 * @prettier
 * @flow
 */

import {commitMutation, graphql} from 'react-relay';
import environment from '../relayEnvironment';

type LinkSkypeAccountData = {
  username: string,
  password: string,
};

type MutationResponse = {
  linkSkypeAccount: {
    skypeToken: string,
    skypeTokenExpiration: number,
    registrationToken: string,
    registrationTokenExpiration: number,
  },
};

const mutation = graphql`
  mutation LinkSkypeAccountMutation($data: LinkSkypeAccountData!) {
    linkSkypeAccount(data: $data) {
      skypeToken
      skypeTokenExpiration
      registrationToken
      registrationTokenExpiration
    }
  }
`;

async function linkSkypeAccount(data: LinkSkypeAccountData) {
  const variables = {
    data: (data: Object),
  };

  return new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: ({linkSkypeAccount}: MutationResponse, errors) => {
        if (errors) {
          reject(Error(errors[0].message));
        } else {
          localStorage.setItem('SkypeToken', linkSkypeAccount.skypeToken);
          localStorage.setItem(
            'SkypeTokenExpiration',
            linkSkypeAccount.skypeTokenExpiration.toString(10),
          );
          localStorage.setItem(
            'RegistrationToken',
            linkSkypeAccount.registrationToken,
          );
          localStorage.setItem(
            'RegistrationTokenExpiration',
            linkSkypeAccount.registrationTokenExpiration.toString(10),
          );
          resolve();
        }
      },
      onError: err => {
        reject(err);
      },
    });
  });
}

export default linkSkypeAccount;
