import { createContext, useContext } from 'react';

import { ethers } from 'ethers';

import { TicTacToeGame } from '../../types';

/**
 * Web3 Context
 */

export interface Web3ContextType {
  getMyAddress: () => Promise<string>;
  hasActiveGame: () => Promise<boolean>;
  getActiveGame: () => Promise<TicTacToeGame | null>;
  getAllGames: () => Promise<TicTacToeGame[]>;
  createGame: (buyIn: number) => Promise<void>;
  joinGame: (gameId: number, buyIn: number) => Promise<void>;
  forfeitGame: () => Promise<void>;
  leaveGame: () => Promise<void>;
  claimProfit: () => Promise<void>;
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
  const _toGame = (data: any): TicTacToeGame => ({
    id: ethers.BigNumber.from(data.id).toNumber(),
    board: data.board,
    player1: data.player1,
    player2: data.player2,
    winner: data.winner,
    turn: data.turn,
    buyIn: parseFloat(ethers.utils.formatEther(data.buyIn)),
    claimed: data.claimed,
  });

  const getMyAddress = async (): Promise<string> => {
    return contract.signer.getAddress();
  };

  const hasActiveGame = async (): Promise<boolean> => {
    return contract.hasActiveGame();
  };

  const getActiveGame = async (): Promise<TicTacToeGame | null> => {
    const game = await contract.getActiveGame();
    return game.id > 0 ? _toGame(game) : null;
  };

  const getAllGames = async (): Promise<TicTacToeGame[]> => {
    const games = await contract.getAllGames();
    return games.map((data: any) => _toGame(data));
  };

  const createGame = async (buyIn: number) => {
    const buyInEth = ethers.utils.parseEther(buyIn.toString());
    const tx = await contract.createGame({ value: buyInEth });
    const receipt = await tx.wait();
    return receipt;
  };

  const joinGame = async (gameId: number, buyIn: number) => {
    const buyInEth = ethers.utils.parseEther(buyIn.toString());
    const tx = await contract.joinGame(gameId, { value: buyInEth });
    const receipt = await tx.wait();
    return receipt;
  };

  const forfeitGame = async (): Promise<void> => {
    const tx = await contract.forfeitGame();
    const receipt = await tx.wait();
    return receipt;
  };

  const leaveGame = async (): Promise<void> => {
    const tx = await contract.leaveGame();
    const receipt = await tx.wait();
    return receipt;
  };

  const claimProfit = async (): Promise<void> => {
    const tx = await contract.claimProfit();
    const receipt = await tx.wait();
    return receipt;
  };

  const makeMove = async (index: number) => {
    const tx = await contract.makeMove(index);
    const receipt = await tx.wait();
    return receipt;
  };

  return (
    <Web3Context.Provider
      value={{
        getMyAddress,
        hasActiveGame,
        getActiveGame,
        getAllGames,
        createGame,
        joinGame,
        forfeitGame,
        leaveGame,
        claimProfit,
        makeMove,
      }}
    >
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
