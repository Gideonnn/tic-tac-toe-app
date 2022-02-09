import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { env } from './utils';

import './index.css';

env(['REACT_APP_CONTRACT_ADDRESS']);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
