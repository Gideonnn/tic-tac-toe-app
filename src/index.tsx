import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './index.css';

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
