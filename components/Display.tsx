import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
import { SocialIcon } from "react-social-icons";

import Link from "next/link";

interface DisplayProps {
  voto: number | null;
  votoConfirmado: boolean;
  contagemRegressivaAtiva: boolean;
  tempoRestante: number;
  numerosDigitados: number;
  getCandidatoImage: () => { src: string; width: number; height: number };
  totalVotos?: number;
}

const Display: React.FC<DisplayProps> = ({
  voto,
  votoConfirmado,
  contagemRegressivaAtiva,
  tempoRestante,
  numerosDigitados,
  getCandidatoImage,
  totalVotos,
}) => {
  const votosExibidos = totalVotos === -1 ? 0 : totalVotos;

  const isVotoValido = voto === 22 || voto === 23;

  return (
    <div className="bg-gray-100 p-4 sm:p-8 rounded-lg">
      <div className="w-full sm:w-80 h-96 sm:h-96 bg-white flex items-center justify-center">
        <div className="text-center">
          {numerosDigitados === 0 && (
            <p className="text-base sm:text-lg font-semibold text-center mt-2 sm:mt-4">
              Tente fazer o Candidato 22 Ganhar! Digite o seu voto
            </p>
          )}

          {voto !== null && (
            <>
              {isVotoValido && (
                <>
                  {getCandidatoImage().src ? (
                    <div className="text-center">
                      <Image
                        src={getCandidatoImage().src}
                        alt={`Candidato ${voto}`}
                        width={getCandidatoImage().width}
                        height={getCandidatoImage().height}
                        // className="mb-4 mx-auto"
                        className="mb-4 mx-auto max-w-full max-h-full md:max-w-200 md:max-h-200"

                        // style={{ maxWidth: "200px", maxHeight: "200px" }}
                      />
                    </div>
                  ) : (
                    <p className="text-base sm:text-lg font-semibold text-center mt-2 sm:mt-4">
                      Candidato não encontrado
                    </p>
                  )}
                  {votoConfirmado && (
                    <p className="text-base sm:text-lg font-semibold text-center mt-2 sm:mt-4">
                      Você votou no Candidato {voto}
                    </p>
                  )}
                </>
              )}
              {!isVotoValido && (
                <p className="text-base sm:text-lg font-semibold text-center mt-2 sm:mt-4">
                  Voto inválido. Por favor, vote nos candidatos 22 ou 23.
                </p>
              )}
            </>
          )}

          {voto === -1 && (
            <p className="text-base sm:text-lg font-semibold text-center mt-2 sm:mt-4">
              Você votou em branco
            </p>
          )}
          {contagemRegressivaAtiva && (
            <p className="text-base sm:text-lg font-semibold text-center mt-2 sm:mt-4">
              Próximo voto em: {tempoRestante} segundos
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-2 sm:mt-4">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-md mx-1 sm:mx-2 bg-gray-300"
          >
            {index < numerosDigitados
              ? index === 0
                ? voto?.toString()[0]
                : voto?.toString()[1]
              : ""}
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <p className="text-base sm:text-lg font-semibold">
          Total de Votos: {votosExibidos}
        </p>
        <div className="mt-4">
          <p className="text-blue-500">Criado por Weslei</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="https://x.com/wesleibruno945" className="text-blue-500">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
