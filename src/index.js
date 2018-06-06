/**
 * @flow
 * @prettier
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const root = document.getElementById('root');
root && ReactDOM.render(<App />, root);

registerServiceWorker();
