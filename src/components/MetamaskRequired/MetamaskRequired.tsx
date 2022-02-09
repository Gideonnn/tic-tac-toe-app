export interface MetamaskRequiredProps {
  children: React.ReactNode;
}

export const MetamaskRequired = ({ children }: MetamaskRequiredProps) => (
  <>{window.ethereum ? children : <div>Please connect to MetaMask</div>}</>
);
