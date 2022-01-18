import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import TicTacToe from '@gideonnn/tic-tac-toe-contracts/artifacts/contracts/TicTacToe.sol/TicTacToe.json';
import { ethers } from 'ethers';

import { Layout, Theme } from './components';
import { Play, Settings } from './pages';
import { Web3Provider } from './services';

function App() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    process.env.REACT_APP_CONTRACT_ADDRESS!,
    TicTacToe.abi,
    signer,
  );

  return (
    <Web3Provider contract={contract}>
      <Theme theme="light">
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="settings" element={<Settings />} />
              <Route path="play" element={<Play />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </Theme>
    </Web3Provider>
  );
}

export default App;
