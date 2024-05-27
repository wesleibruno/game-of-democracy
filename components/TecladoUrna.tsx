import React from 'react';
import { Button } from './ui/button';

interface TecladoUrnaProps {
  onInputChange: (value: string) => void;
  onCorrige: () => void;
  onConfirma: () => void;
  onBranco: () => void;
}

const TecladoUrna: React.FC<TecladoUrnaProps> = ({ onInputChange, onCorrige, onConfirma, onBranco }) => {
  return (
    <div className="bg-black p-6 rounded-lg space-y-4 mb-10 md:mb-0">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <Button
            key={num}
            onClick={() => onInputChange(num.toString())}
            className="bg-gray-200 text-black hover:bg-gray-300 text-2xl md:text-3xl lg:text-4xl font-bold py-6 rounded-md"
          >
            {num}
          </Button>
        ))}
        <Button
          onClick={onBranco}
          className="bg-white text-black border border-gray-300 hover:bg-gray-100 text-lg md:text-xl lg:text-2xl font-bold py-6 rounded-md"
        >
          BRANCO
        </Button>
        <Button
          onClick={onCorrige}
          className="bg-orange-500 hover:bg-orange-600 text-white text-lg md:text-xl lg:text-2xl font-bold py-6 rounded-md"
        >
          CORRIGE
        </Button>
        <Button
          onClick={onConfirma}
          className="bg-green-600 hover:bg-green-700 text-white text-lg md:text-xl lg:text-2xl font-bold py-6 rounded-md"
        >
          CONFIRMA
        </Button>
      </div>
    </div>
  );
};

export default TecladoUrna;
