import { Circle, Cross } from '../../../Icons';

export interface CellProps {
  value: number;
  disable: boolean;
  onClick: () => void;
}

export const Cell = ({ value, disable, onClick }: CellProps) => {
  switch (value) {
    case 1:
      return (
        <div className="flex items-center justify-center w-full h-full cursor-not-allowed">
          <Cross />
        </div>
      );
    case 2:
      return (
        <div className="flex items-center justify-center w-full h-full cursor-not-allowed">
          <Circle />
        </div>
      );
    default:
      return disable ? (
        <div className="flex w-full h-full cursor-not-allowed" />
      ) : (
        <button className="w-full h-full hover:bg-gray-50" onClick={onClick}></button>
        // <button className="flex items-center justify-center w-full h-full group" onClick={onClick}>
        //   <div className="hidden group-hover:block">
        //     <Cross />
        //   </div>
        // </button>
      );
  }
};
