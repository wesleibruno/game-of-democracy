import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Display from "./Display";
import Keypad from "./Keypad";
import Results from "./Results";
import useVotingMachine from "@/hooks/useVotingMachine";
import CardComponent from "./CardComponent";

const UrnaEletronica: React.FC = () => {
  const {
    voto,
    numerosDigitados,
    votoConfirmado,
    contagemRegressivaAtiva,
    tempoRestante,
    novoVotoPermitido,
    votosCandidatos,
    votosBranco,
    mostrarResultados,
    handleVotar,
    handleCancelarVoto,
    handleVotarBranco,
    handleCorrigeVoto,
    handleConfirmarVoto,
    mostrarResultadosEleicao,
    reiniciarEleicao,
    getCandidatoImage,
  } = useVotingMachine();

  return (
    <div className="flex flex-col items-center">
      {!mostrarResultados && (
        <Button
          className="fixed bottom-4 right-4"
          onClick={mostrarResultadosEleicao}
        >
          Mostrar Resultados
        </Button>
      )}
      {!mostrarResultados ? (
        <div className="flex h-screen items-center justify-center">
          <div>
            <div className="grid grid-rows-1 mt-38">
              <div className="flex justify-between w-full mb-4">
                <CardComponent
                  candidato="23"
                  votos={votosCandidatos[23]}
                  imagem="/candidato-23.jpg"
                />
                <CardComponent
                  candidato="22"
                  votos={votosCandidatos[22]}
                  imagem="/candidato-22.jpg"
                />
              </div>
            </div>
            <div className="border border-gray-100 rounded-lg flex flex-row shadow-lg">
              <Display
                voto={voto}
                votoConfirmado={votoConfirmado}
                contagemRegressivaAtiva={contagemRegressivaAtiva}
                tempoRestante={tempoRestante}
                numerosDigitados={numerosDigitados}
                getCandidatoImage={getCandidatoImage}
              />
              <Keypad
                handleVotar={handleVotar}
                handleVotarBranco={handleVotarBranco}
                handleCorrigeVoto={handleCorrigeVoto}
                handleConfirmarVoto={handleConfirmarVoto}
              />
            </div>
          </div>
        </div>
      ) : (
        <Results
          votosCandidatos={votosCandidatos}
          votosBranco={votosBranco}
          reiniciarEleicao={reiniciarEleicao}
        />
      )}
    </div>
  );
};

export default UrnaEletronica;
