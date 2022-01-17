import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { env } from './utils';

import './index.css';

env(['REACT_APP_CONTRACT_ADDRESS']);

ReactDOM.render(
  window.ethereum ? (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) : (
    <div>Please connect to MetaMask</div>
  ),
  document.getElementById('root'),
);
