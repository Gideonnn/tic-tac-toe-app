import { useEffect } from 'react';

import { useMetamask } from '../../hooks';

export const ChangeAccount = () => {
  const { onEvent } = useMetamask();

  useEffect(() => {
    const unsubAccountsChanged = onEvent('accountsChanged', () => {
      window.location.reload();
    });

    const unsubChainChanged = onEvent('chainChanged', () => {
      window.location.reload();
    });

    return () => {
      unsubAccountsChanged();
      unsubChainChanged();
    };
  }, [onEvent]);

  return <></>;
};
