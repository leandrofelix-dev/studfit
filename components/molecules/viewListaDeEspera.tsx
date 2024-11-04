-"use client";

import React from "react";
import { Input } from "@nextui-org/react";
import { Text } from "../atoms/text";

interface AlunoListaEspera {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  peso?: number;
  altura?: number;
  cirurgias?: string;
  patologias?: string;
  mesesExperienciaMusculacao?: number;
  diagnosticoLesaoJoelho?: string;
  consumoCigarro?: boolean;
  consumoAlcool?: boolean;
  praticaExercicioFisico?: boolean;
  colocacao?: number;
}

interface ViewListaDeEsperaProps {
  dadosAluno: AlunoListaEspera;
}

function ViewListaDeEspera({ dadosAluno }: ViewListaDeEsperaProps) {
  const { nome, email, telefone } = dadosAluno;

  return (
    <div className="flex flex-col gap-4">
      <Text span regular className="text-gray-600 text-md">
        Informações pessoais
      </Text>
      <Input label="Nome" value={nome} isReadOnly />
      <div className="flex gap-2">
        <Input label="Email" value={email} isReadOnly />
        <Input label="Telefone" value={telefone} isReadOnly />
      </div>
    </div>
  );
}

export { ViewListaDeEspera };
