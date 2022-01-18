import { createContext, useContext } from 'react';

import { ethers } from 'ethers';

/**
 * Web3 Context
 */

export interface Web3ContextType {
  requestAccount: () => void;
  createGame: (buyIn: number) => Promise<void>;
  getBoard: () => Promise<number[] | null>;
  getOpenGames: () => Promise<void>;
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
  const requestAccount = () => {
    return window.ethereum.request({ method: 'eth_requestAccounts' });
  };

  const createGame = (buyIn: number) => {
    const buyInEth = ethers.utils.parseEther(buyIn.toString());
    return contract.createGame(buyInEth, { value: buyInEth });
  };

  const getBoard = async () => {
    const hasActiveGame = await contract.hasActiveGame();
    return hasActiveGame ? contract.getBoard() : null;
  };

  const getOpenGames = () => {
    return contract.getOpenGames();
  };

  return (
    <Web3Context.Provider value={{ requestAccount, createGame, getBoard, getOpenGames }}>
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
