import { useCallback, useEffect, useState } from 'react';

import { Board, Button, CreatePanel, GameList, GameStatus } from '../../components';
import { useWeb3 } from '../../hooks';
import { TicTacToeGame } from '../../types';
import { isAddressZero } from '../../utils';

import '../../styles/colors.scss';

export const Play = () => {
  const {
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
  } = useWeb3();
  const [activeGame, setActiveGame] = useState<TicTacToeGame | null>(null);
  const [gameList, setGameList] = useState<TicTacToeGame[]>([]);
  const [myAddress, setMyAddress] = useState<string | null>(null);

  const loadMyAddress = useCallback(async () => {
    getMyAddress().then(address => {
      setMyAddress(address);
    });
  }, [getMyAddress]);

  const loadActiveGame = useCallback(async () => {
    const shouldLoadGameData = await hasActiveGame();
    if (shouldLoadGameData) {
      const activeGame = await getActiveGame();
      console.log('activeGame', activeGame);
      setActiveGame(activeGame);
    } else {
      setActiveGame(null);
    }
  }, [getActiveGame, hasActiveGame]);

  const loadGameList = useCallback(async () => {
    try {
      const allGames = await getAllGames();
      const openGames = allGames
        .filter(game => isAddressZero(game.winner))
        .filter(game => isAddressZero(game.player2));
      setGameList(openGames);
    } catch (err) {
      setGameList([]);
      console.error(err);
    }
  }, [getAllGames]);

  useEffect(() => {
    loadMyAddress();
    loadActiveGame();
    loadGameList();
  }, [loadActiveGame, loadGameList, loadMyAddress]);

  const handleCreateGame = async (buyIn: number) => {
    try {
      await createGame(buyIn);
      await loadActiveGame();
    } catch (error: any) {
      if (error.code == -32603) {
        console.log('Transaction cancelled by user');
      } else {
        console.log('New error code!');
        console.error(error);
      }
    }
  };

  const handleJoinGame = async (gameId: number, buyIn: number) => {
    try {
      await joinGame(gameId, buyIn);
      await loadActiveGame();
    } catch (error: any) {
      console.log('Join game went wrong!');
      console.error(error);
    }
  };

  const handleForfeitGame = async () => {
    try {
      await forfeitGame();
      await loadActiveGame();
    } catch (error: any) {
      console.log('Forfeit game went wrong!');
      console.error(error);
    }
  };

  const handleLeaveGame = async () => {
    try {
      await leaveGame();
      await loadActiveGame();
    } catch (error: any) {
      console.log('Leave game went wrong!');
      console.error(error);
    }
  };

  const handleClaimProfit = async () => {
    try {
      await claimProfit();
      await loadActiveGame();
    } catch (error: any) {
      console.log('Claim profit went wrong!');
      console.error(error);
    }
  };

  const handleMakeMove = async (index: number) => {
    try {
      await makeMove(index);
      await loadActiveGame();
    } catch (error: any) {
      console.log('Make move went wrong!');
      console.error(error);
    }
  };

  return (
    <div className="prose text-center md:mt-12">
      <h1>Tic-tac-toe</h1>
      {activeGame && (
        <Board
          cells={activeGame.board}
          disable={isAddressZero(activeGame.player2) || activeGame.turn !== myAddress}
          onClick={handleMakeMove}
        />
      )}
      {activeGame && myAddress && <GameStatus game={activeGame} myAddress={myAddress} />}
      {activeGame && activeGame.winner === myAddress && !activeGame.claimed && (
        <Button onClick={handleClaimProfit}>Claim to wallet</Button>
      )}
      {activeGame && isAddressZero(activeGame.winner) && (
        <Button onClick={handleForfeitGame}>Forfeit</Button>
      )}
      {activeGame && isAddressZero(activeGame.turn) && activeGame.claimed && (
        <Button onClick={handleLeaveGame}>Leave game</Button>
      )}
      {!activeGame && <CreatePanel onCreateGame={handleCreateGame} />}
      {!activeGame && gameList.length > 0 && <GameList games={gameList} onJoin={handleJoinGame} />}
    </div>
  );
};
