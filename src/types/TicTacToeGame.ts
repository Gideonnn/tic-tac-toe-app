export interface TicTacToeGame {
  id: number;
  board: number[];
  player1: string;
  player2: string;
  winner: string;
  turn: string;
  buyIn: number;
  claimed: boolean;
}
