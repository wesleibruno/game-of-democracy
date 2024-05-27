import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ResultsProps {
  votosCandidatos: { [key: number]: number };
  votosBranco: number;
  reiniciarEleicao: () => void;
}

const Results: React.FC<ResultsProps> = ({
  votosCandidatos,
  votosBranco,
  reiniciarEleicao,
}) => {
  const candidato23Votos = votosCandidatos[23] || 0;
  const candidato22Votos = votosCandidatos[22] || 0;

  let vencedor: number | null = null;
  let perdedor: number | null = null;
  let vencedorVotos: number = 0;
  let perdedorVotos: number = 0;

  if (candidato23Votos > candidato22Votos) {
    vencedor = 23;
    perdedor = 22;
    vencedorVotos = candidato23Votos;
    perdedorVotos = candidato22Votos;
  } else if (candidato22Votos > candidato23Votos) {
    vencedor = 22;
    perdedor = 23;
    vencedorVotos = candidato22Votos;
    perdedorVotos = candidato23Votos;
  }

  const getCandidatoImage = (candidato: number) => {
    if (candidato === 23) {
      return "/candidato-23.jpg";
    } else if (candidato === 22) {
      return "/candidato-22.jpg";
    } else {
      return "";
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <Card className="bg-gray-100 p-4 rounded-lg">
        <CardHeader>Resultados da Eleição</CardHeader>
        <CardContent className="text-center">
          {vencedor !== null && perdedor !== null && (
            <>
              <div className="mt-8">
                <p className="text-xl font-bold">Vencedor da Eleição</p>
                <p className="text-lg">Candidato {vencedor}</p>
                <Image
                  src={getCandidatoImage(vencedor)}
                  alt={`Candidato ${vencedor}`}
                  width={100}
                  height={100}
                  className="mx-auto"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
                <p>Total de Votos: {vencedorVotos}</p>
              </div>
              <div className="mt-8">
                <p className="text-xl font-bold">Perdedor da Eleição</p>
                <p className="text-lg">Candidato {perdedor}</p>
                <Image
                  src={getCandidatoImage(perdedor)}
                  alt={`Candidato ${perdedor}`}
                  width={100}
                  height={100}
                  className="mx-auto"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
                <p>Total de Votos: {perdedorVotos}</p>
              </div>
              <div className="mt-4">
                <p className="text-lg font-semibold">Votos em Branco</p>
                <p>Total: {votosBranco}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <Button className="mt-4" onClick={reiniciarEleicao}>
        Nova Eleição
      </Button>
    </div>
  );
};

export default Results;
