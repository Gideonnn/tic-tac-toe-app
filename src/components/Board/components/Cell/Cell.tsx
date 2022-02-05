import { Circle, Cross } from '../../../Icons';

export interface CellProps {
  value: number;
  onClick: () => void;
}

export const Cell = ({ value, onClick }: CellProps) => {
  switch (value) {
    case 1:
      return (
        <div className="cursor-not-allowed">
          <Cross />
        </div>
      );
    case 2:
      return (
        <div className="cursor-not-allowed">
          <Circle />
        </div>
      );
    default:
      return (
        <button
          className="flex items-center justify-center w-full h-full border-4 border-white rounded-md group"
          onClick={onClick}
        >
          <div className="hidden group-hover:block">
            <Cross />
          </div>
        </button>
      );
  }
};
