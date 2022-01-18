import { useEffect, useState } from 'react';

import { useWeb3 } from '../../services';

import '../../styles/colors.scss';

// const handleGetBoard = async () => {
//   try {
//     const result = await ticTacToeService.getBoard();
//     console.log('getBoard successful', result);
//   } catch (error) {
//     console.error(error);
//   }
// };

// const handleGetOpenGames = async () => {
//   try {
//     const result = await ticTacToeService.getOpenGames();
//     console.log('getOpenGames successful', result);
//   } catch (error) {
//     console.error(error);
//   }
// };

export const Play = () => {
  const { createGame, getBoard } = useWeb3();
  const [board, setBoard] = useState<number[] | null>(null);

  useEffect(() => {
    getBoard().then(result => {
      setBoard(result);
    });
  }, [getBoard]);

  const handleCreateGame = async () => {
    try {
      const result = await createGame(0.001);
      console.log('createGame successful', result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="prose">
      <h1>Tic-tac-toe</h1>
      <button onClick={handleCreateGame}>Create game</button>
      {board && (
        <div>
          {board.map((value, index) => (
            <div key={index}>{value}</div>
          ))}
        </div>
      )}
    </div>
  );
};
