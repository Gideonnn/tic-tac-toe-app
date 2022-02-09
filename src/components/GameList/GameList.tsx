import { TicTacToeGame } from '../../types';
import { Ethereum } from '../Icons';

export interface GameListProps {
  games: TicTacToeGame[];
  onJoin: (gameId: number, buyIn: number) => void;
}

export const GameList = ({ games, onJoin }: GameListProps) => {
  return (
    <div className="mt-4 border-8 rounded-md w-60 ">
      <ul className="p-0 m-0">
        {games.map(game => (
          <li key={game.id} className="flex items-center ml-2">
            <Ethereum width={14} />
            <span className="ml-2 mr-8">{game.buyIn}</span>
            <button
              className="flex-1 py-1 mr-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={() => onJoin(game.id, game.buyIn)}
            >
              Join
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
