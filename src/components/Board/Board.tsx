import { Cell } from './components';

export interface BoardProps {
  cells: number[];
  onClick: (index: number, value: number) => void;
}

export const Board = ({ cells, onClick }: BoardProps) => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 border-4 rounded-md w-60 h-60">
      {cells.map((value, index) => (
        <div className="border-4" key={index}>
          <Cell value={value} onClick={() => onClick(index, value)} />
        </div>
      ))}
    </div>
  );
};
