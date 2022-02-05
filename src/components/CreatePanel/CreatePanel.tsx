import { useState } from 'react';

export interface CreatePanelProps {
  onCreateGame: (buyIn: number) => void;
}

export const CreatePanel = ({ onCreateGame }: CreatePanelProps) => {
  const [buyIn, setBuyIn] = useState(0);
  const [valid, setValid] = useState(false);

  const handleBuyInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValid(false);
    try {
      const parsed = parseFloat(event.target.value.replace(',', '.'));
      if (!isNaN(parsed)) {
        setBuyIn(parsed);
        setValid(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="mt-4 border-8 rounded-md w-60">
      <label htmlFor="buyin">Buy in:</label>
      <div className="flex my-4">
        <input
          className="flex-1 px-2 mx-4 border"
          id="buyin"
          type="text"
          defaultValue={buyIn}
          size={5}
          onChange={handleBuyInChange}
        />
        <button
          className="flex-1 py-1 mr-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-300"
          disabled={!valid}
          onClick={() => onCreateGame(buyIn)}
        >
          Create
        </button>
      </div>
    </div>
  );
};
