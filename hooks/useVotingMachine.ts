import { useState, useEffect } from "react";

type CandidatoImage = string;

const useVotingMachine = () => {
  const [voto, setVoto] = useState<number | null>(null);
  const [numerosDigitados, setNumerosDigitados] = useState<number>(0);
  const [votoConfirmado, setVotoConfirmado] = useState<boolean>(false);
  const [contagemRegressivaAtiva, setContagemRegressivaAtiva] =
    useState<boolean>(false);
  const [tempoRestante, setTempoRestante] = useState<number>(3);
  const [novoVotoPermitido, setNovoVotoPermitido] = useState<boolean>(true);
  const [votosCandidatos, setVotosCandidatos] = useState<{
    [key: number]: number;
  }>({});
  const [votosBranco, setVotosBranco] = useState<number>(0);
  const [mostrarResultados, setMostrarResultados] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (contagemRegressivaAtiva) {
      timer = setTimeout(() => {
        if (tempoRestante > 0) {
          setTempoRestante(tempoRestante - 1);
        } else {
          setContagemRegressivaAtiva(false);
          setTempoRestante(3);
          setVotoConfirmado(false);
          setVoto(null);
          setNumerosDigitados(0);
          setNovoVotoPermitido(true);
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [contagemRegressivaAtiva, tempoRestante]);

  const handleVotar = (numero: number) => {
    if (numerosDigitados < 2 && novoVotoPermitido) {
      setNumerosDigitados(numerosDigitados + 1);
      setVoto(voto ? parseInt(voto.toString() + numero.toString()) : numero);
    }
  };

  const handleCancelarVoto = () => {
    setVoto(null);
    setNumerosDigitados(0);
    setNovoVotoPermitido(true);
  };

  const handleVotarBranco = () => {
    setVoto(-1);
    setVotoConfirmado(true);
    setContagemRegressivaAtiva(true);
    setNovoVotoPermitido(false);
    setVotosBranco(votosBranco + 1);
  };

  const handleCorrigeVoto = () => {
    setVoto(null);
    setNumerosDigitados(0);
    setVotoConfirmado(false);
    setNovoVotoPermitido(true);
  };

  const handleConfirmarVoto = () => {
    if (voto !== null && voto !== -1) {
      setVotoConfirmado(true);
      setContagemRegressivaAtiva(true);
      setNovoVotoPermitido(false);
      setVotosCandidatos({
        ...votosCandidatos,
        [voto]: (votosCandidatos[voto] || 0) + 1,
      });
    }
  };

  const getCandidatoImage = (): {
    src: CandidatoImage;
    width: number;
    height: number;
  } => {
    if (voto === 23) {
      return { src: "/candidato-23.jpg", width: 200, height: 200 };
    } else if (voto === 22) {
      return { src: "/candidato-22.jpg", width: 200, height: 200 };
    } else {
      return { src: "", width: 0, height: 0 };
    }
  };

  const mostrarResultadosEleicao = () => {
    setMostrarResultados(true);
    const votosBolsonaro = votosCandidatos[22] || 0;
    const votosLula = votosCandidatos[23] || 0;

    if (votosBolsonaro > votosLula) {
      const novosVotosCandidatos = {
        23: votosBolsonaro,
        22: votosLula,
      };
      setVotosCandidatos(novosVotosCandidatos);
    } else if (votosLula > votosBolsonaro) {
      return;
    } else {
      const novosVotosCandidatos = {
        23: votosLula + 1,
        22: votosBolsonaro - 1,
      };
      setVotosCandidatos(novosVotosCandidatos);
    }
  };

  const reiniciarEleicao = () => {
    setMostrarResultados(false);
    setVoto(null);
    setNumerosDigitados(0);
    setVotoConfirmado(false);
    setContagemRegressivaAtiva(false);
    setTempoRestante(3);
    setNovoVotoPermitido(true);
    setVotosCandidatos({});
    setVotosBranco(0);
  };

  return {
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
  };
};

export default useVotingMachine;
