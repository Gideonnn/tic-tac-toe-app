import React from 'react';

import TicTacToe from '@gideonnn/tic-tac-toe-contracts/artifacts/contracts/TicTacToe.sol/TicTacToe.json';

import { createTicTacToeService } from './services';

function App() {
  if (!process.env.REACT_APP_CONTRACT_ADDRESS) {
    return <div>Can not find contract address</div>;
  }

  const ticTacToeService = createTicTacToeService(
    process.env.REACT_APP_CONTRACT_ADDRESS,
    TicTacToe.abi,
    window.ethereum,
  );

  const handleCreateGame = async () => {
    try {
      const result = await ticTacToeService.createGame(0.001);
      console.log('createGame successful', result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetBoard = async () => {
    try {
      const result = await ticTacToeService.getBoard();
      console.log('getBoard successful', result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetOpenGames = async () => {
    try {
      const result = await ticTacToeService.getOpenGames();
      console.log('getOpenGames successful', result);
    } catch (error) {
      console.error(error);
    }
  };

  ticTacToeService.requestAccount();

  return (
    <div>
      <button onClick={handleCreateGame}>Create game</button>
      <button onClick={handleGetBoard}>Get board</button>
      <button onClick={handleGetOpenGames}>Get open games</button>
    </div>
  );
}

export default App;
