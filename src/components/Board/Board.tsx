import { Cell } from './components';

export interface BoardProps {
  cells: number[];
  disable: boolean;
  onClick: (index: number, value: number) => void;
}

export const Board = ({ cells, disable, onClick }: BoardProps) => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 border-4 rounded-md w-60 h-60">
      {cells.map((value, index) => (
        <div className={`border-4 ${disable ? 'bg-gray-100' : ''}`} key={index}>
          <Cell value={value} disable={disable} onClick={() => onClick(index, value)} />
        </div>
      ))}
    </div>
  );
};
