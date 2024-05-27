import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface CardComponentProps {
  candidato: string;
  votos: number;
  imagem: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ candidato, votos, imagem }) => (
  <Card className="bg-gray-100 p-4 rounded-lg">
    <CardTitle>Candidato {candidato}</CardTitle>
    <CardContent className="text-center">
      <Image src={imagem} alt={`Candidato ${candidato}`} width={50} height={50} className="mx-auto" style={{ maxWidth: "200px", maxHeight: "200px" }} />
    </CardContent>
    <CardDescription className="text-center">
      Total de Votos: {votos || 0}
    </CardDescription>
  </Card>
);

export default CardComponent;
