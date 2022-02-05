import { useCallback, useEffect, useState } from 'react';

import { Board, CreatePanel, GameList } from '../../components';
import { useWeb3 } from '../../services';
import { TicTacToeGame } from '../../types';

import '../../styles/colors.scss';

export const Play = () => {
  const { createGame, joinGame, getBoard, getOpenGames, makeMove } = useWeb3();
  const [board, setBoard] = useState<number[] | null>(null);
  const [gameList, setGameList] = useState<TicTacToeGame[]>([]);

  const loadData = useCallback(async () => {
    console.log('called loadData');

    getBoard().then(board => {
      console.log('board: ', board);
      setBoard(board);
    });
    getOpenGames().then(games => {
      console.log('games: ', games);
      setGameList(games);
    });
  }, [getBoard, getOpenGames]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleBoardClick = async (index: number) => {
    try {
      const result = await makeMove(index);
      console.log(result);
    } catch (error: any) {
      console.log('Make move went wrong!');
      console.error(error);
    }
  };

  const handleCreateGame = async (buyIn: number) => {
    try {
      const result = await createGame(buyIn);
      console.log('createGame successful', result);
      await loadData();
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
      await loadData();
    } catch (error: any) {
      console.log('Join game went wrong!');
      console.error(error);
    }
  };

  return (
    <div className="prose text-center md:mt-12">
      <h1>Tic-tac-toe</h1>
      {board && <Board cells={board} onClick={handleBoardClick} />}
      {!board && <CreatePanel onCreateGame={handleCreateGame} />}
      {!board && gameList.length > 0 && <GameList games={gameList} onJoin={handleJoinGame} />}
    </div>
  );
};
