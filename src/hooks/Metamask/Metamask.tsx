import { createContext, useContext } from 'react';

/**
 * Metamask Context
 */

export interface MetamaskContextType {
  onEvent: (event: string, cb: () => void) => () => void;
}

export const MetamaskContext = createContext<MetamaskContextType>({} as MetamaskContextType);

/**
 * Metamask Provider
 */

export interface MetamaskProviderProps {
  ethereum: any;
  children: React.ReactNode;
}

export const MetamaskProvider = ({ ethereum, children }: MetamaskProviderProps) => {
  const onEvent = (event: string, callback: () => void) => {
    const listener = ethereum.on(event, callback);
    return () => ethereum.removeListener(event, listener);
  };

  return (
    <MetamaskContext.Provider
      value={{
        onEvent,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

/**
 * Metamask Hook
 */

export const useMetamask = () => {
  const context = useContext(MetamaskContext);

  if (!context) {
    throw new Error('useMetamask must be used within a MetamaskProvider');
  }

  return context;
};
