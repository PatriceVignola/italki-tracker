/**
 * @prettier
 * @flow
 */

import {
  Environment,
  Network,
  RecordSource,
  Store,
  QueryResponseCache,
} from 'relay-runtime';

const cache = new QueryResponseCache({size: 100, ttl: 1000000});

async function fetchQuery(operation, variables, cacheConfig, uploadables) {
  const cachedData = cache.get(operation.text, variables);

  if (operation.operationKind !== 'mutation' && cachedData) {
    return cachedData;
  }

  const authorization = localStorage.getItem('Authorization');
  const skypeToken = localStorage.getItem('SkypeToken');
  const registrationToken = localStorage.getItem('RegistrationToken');

  const headers = {};

  let body;

  if (uploadables) {
    const formData = new FormData();
    formData.append('query', operation.text);
    formData.append('variables', JSON.stringify(variables));

    Object.keys(uploadables).forEach(key => {
      formData.append(key, uploadables[key]);
    });

    body = formData;
  } else {
    headers['Content-Type'] = 'application/json';

    body = JSON.stringify({
      query: operation.text,
      variables,
    });
  }

  authorization && (headers.Authorization = authorization);
  skypeToken && (headers.SkypeToken = skypeToken);
  registrationToken && (headers.RegistrationToken = registrationToken);

  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers,
    body,
  });

  const data = response.json();

  // TODO: Improve cache by setting a query id instead
  cache.set(operation.text, variables, data);
  return data;
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
