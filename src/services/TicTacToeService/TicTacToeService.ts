import { ethers } from 'ethers';

export const createTicTacToeService = (address: string, abi: any, ethereum: any) => {
  if (!address) throw new Error('Missing address');
  if (!abi) throw new Error('Missing abi');
  if (!ethereum) throw new Error('Missing ethereum');

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);

  const requestAccount = async () => {
    ethereum.request({ method: 'eth_requestAccounts' });
  };

  const createGame = async (buyIn: number) => {
    const buyInEth = ethers.utils.parseEther(buyIn.toString());
    const transaction = await contract.createGame(buyInEth, { value: buyInEth });
    const receipt = await transaction.wait();
    console.log('receipt: ', receipt);
  };

  const getBoard = async () => {
    const transaction = await contract.getBoard();
    console.log('getBoard: ', transaction);
  };

  const getOpenGames = async () => {
    const transaction = await contract.getOpenGames();
    console.log('getOpenGames: ', transaction);
  };

  return {
    requestAccount,
    createGame,
    getBoard,
    getOpenGames,
  };
};
