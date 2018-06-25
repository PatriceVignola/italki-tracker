/**
 * @flow
 * @prettier
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {unregister} from './registerServiceWorker';
import './index.css';

const root = document.getElementById('root');
root && ReactDOM.render(<App />, root);

unregister();
