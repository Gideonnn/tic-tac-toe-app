import { createContext, useContext } from 'react';

import { ethers } from 'ethers';

import { TicTacToeGame } from '../../types';

/**
 * Web3 Context
 */

export interface Web3ContextType {
  createGame: (buyIn: number) => Promise<void>;
  joinGame: (gameId: number, buyIn: number) => Promise<void>;
  getBoard: () => Promise<number[] | null>;
  getOpenGames: () => Promise<TicTacToeGame[]>;
  makeMove: (index: number) => Promise<void>;
}

export const Web3Context = createContext<Web3ContextType>({} as Web3ContextType);

/**
 * Web3 Provider
 */

export interface Web3ProviderProps {
  contract: ethers.Contract;
  children: React.ReactNode;
}

export const Web3Provider = ({ contract, children }: Web3ProviderProps) => {
  const createGame = async (buyIn: number) => {
    const buyInEth = ethers.utils.parseEther(buyIn.toString());
    const tx = await contract.createGame(buyInEth, { value: buyInEth });
    const receipt = await tx.wait();
    return receipt;
  };

  const joinGame = async (gameId: number, buyIn: number) => {
    const buyInEth = ethers.utils.parseEther(buyIn.toString());
    const tx = await contract.joinGame(gameId, { value: buyInEth });
    const receipt = await tx.wait();
    return receipt;
  };

  const getBoard = async () => {
    const hasActiveGame = await contract.hasActiveGame();
    if (hasActiveGame) {
      const board = await contract.getBoard();
      return board;
    }

    console.log('no active game');
    return null;
  };

  const getOpenGames = async (): Promise<TicTacToeGame[]> => {
    try {
      const games = await contract.getOpenGames();
      return games.map((data: any) => {
        const game: TicTacToeGame = {
          id: data.id,
          board: data.board,
          player1: data.player1,
          player2: data.player2,
          winner: data.winner,
          turn: data.turn,
          buyIn: parseFloat(ethers.utils.formatEther(data.buyIn)),
        };
        return game;
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const makeMove = async (index: number) => {
    return contract.makeMove(index);
  };

  return (
    <Web3Context.Provider value={{ createGame, joinGame, getBoard, getOpenGames, makeMove }}>
      {children}
    </Web3Context.Provider>
  );
};

/**
 * Web3 Hook
 */

export const useWeb3 = () => {
  const context = useContext(Web3Context);

  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }

  return context;
};
