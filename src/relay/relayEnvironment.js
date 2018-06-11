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

type Operation = {
  text: string,
};

const cache = new QueryResponseCache({size: 100, ttl: 1000000});

async function fetchQuery(operation: Operation, variables) {
  const cachedData = cache.get(operation.text, variables);

  if (cachedData) {
    return cachedData;
  }

  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
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
