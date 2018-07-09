/**
 * @prettier
 * @flow
 */

import {commitMutation, graphql} from 'react-relay';
import environment from '../relayEnvironment';

type MutationInput = {
  studentId: string,
};

type MutationResponse = {
  sendDocument: {
    document: {
      id: string,
    },
  },
};

const mutation = graphql`
  mutation SendDocumentMutation($input: SendDocumentData!) {
    sendDocument(data: $input) {
      document {
        id
      }
    }
  }
`;

async function sendDocument(input: MutationInput, file: File, configs?: any) {
  const variables = {
    input: {...input},
  };

  const uploadables = {file};

  return new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables,
      uploadables,
      configs,
      onCompleted: (response: MutationResponse, errors) => {
        if (!errors) {
          resolve(response.sendDocument.document.id);
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

export default sendDocument;
