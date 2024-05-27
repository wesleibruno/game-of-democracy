import React from "react";
import { Button } from "@/components/ui/button";

interface KeypadProps {
  handleVotar: (numero: number) => void;
  handleVotarBranco: () => void;
  handleCorrigeVoto: () => void;
  handleConfirmarVoto: () => void;
}

const Keypad: React.FC<KeypadProps> = ({
  handleVotar,
  handleVotarBranco,
  handleCorrigeVoto,
  handleConfirmarVoto,
}) => (
  <div className="bg-gray-100 p-8 rounded-lg ml-8">
    <div className="bg-black p-2 rounded-md">
      <div className="p-2 grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((numero) => (
          <Button key={numero} className="py-2 px-4 bg-blue-500 text-white rounded-md" onClick={() => handleVotar(numero)}>
            {numero}
          </Button>
        ))}
        <Button className="py-2 px-4 bg-blue-500 text-white rounded-md col-start-2" onClick={() => handleVotar(0)}>
          0
        </Button>
      </div>
      <div className="p-2 rounded-md mt-4 flex flex-wrap justify-between">
        <Button className="py-4 px-8 bg-white text-gray-800 rounded-md mb-2" onClick={handleVotarBranco}>
          Branco
        </Button>
        <Button className="py-4 px-8 bg-orange-500 text-white rounded-md mb-2" onClick={handleCorrigeVoto}>
          Corrige
        </Button>
        <Button className="py-4 px-8 bg-green-500 text-white rounded-md mb-2" onClick={handleConfirmarVoto}>
          Confirma
        </Button>
      </div>
    </div>
  </div>
);

export default Keypad;
