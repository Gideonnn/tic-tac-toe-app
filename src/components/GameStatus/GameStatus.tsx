import { TicTacToeGame } from '../../types';
import { isAddressZero } from '../../utils';
import { Ethereum } from '../Icons';

export interface GameStatusProps {
  game: TicTacToeGame;
  myAddress: string;
}

export const GameStatus = ({ game, myAddress }: GameStatusProps) => {
  const gameStarted = !isAddressZero(game.turn) && !isAddressZero(game.player2);
  const gameCompleted = !isAddressZero(game.winner);

  if (!gameStarted && !gameCompleted) {
    return <p>Waiting for an opponent</p>;
  }

  if (gameCompleted && game.winner === myAddress) {
    return game.claimed ? (
      <p>
        You won and claimed <Ethereum width={12} className="inline-block" /> {game.buyIn * 2}!
      </p>
    ) : (
      <p>
        You won <Ethereum width={12} className="inline-block" /> {game.buyIn * 2}!
      </p>
    );
  }

  if (gameCompleted && game.winner !== myAddress) {
    return <p>You lost!</p>;
  }

  if (gameStarted && game.turn !== myAddress) {
    return <p>Waiting for opponent to move</p>;
  }

  if (gameStarted && game.turn === myAddress) {
    return <p>Your turn!</p>;
  }

  return <></>;
};
