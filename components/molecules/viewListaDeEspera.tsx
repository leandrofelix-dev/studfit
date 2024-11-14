"use client";

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
  const {
    nome,
    email,
    telefone,
    peso,
    altura,
    cirurgias,
    patologias,
    mesesExperienciaMusculacao,
    diagnosticoLesaoJoelho,
    consumoCigarro,
    consumoAlcool,
    praticaExercicioFisico,
    colocacao,
  } = dadosAluno;

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
      <div className="flex gap-2">
        <Input label="Peso" value={peso?.toString()} isReadOnly />
        <Input label="Altura" value={altura?.toString()} isReadOnly />
      </div>
      <Input label="Cirurgias" value={cirurgias} isReadOnly />
      <Input label="Patologias" value={patologias} isReadOnly />
      <div className="flex gap-2">
        <Input
          label="Meses de Experiência em Musculação"
          value={mesesExperienciaMusculacao?.toString()}
          isReadOnly
        />
        <Input
          label="Diagnóstico de Lesão no Joelho"
          value={diagnosticoLesaoJoelho}
          isReadOnly
        />
      </div>
      <div className="flex gap-2 flex-col">
        <Input
          label="Consumo de Cigarro"
          value={consumoCigarro ? "Sim" : "Não"}
          isReadOnly
        />
        <Input
          label="Consumo de Álcool"
          value={consumoAlcool ? "Sim" : "Não"}
          isReadOnly
        />
        <Input
          label="Prática de Exercício Físico"
          value={praticaExercicioFisico ? "Sim" : "Não"}
          isReadOnly
        />
      </div>
      <Input label="Colocação" value={colocacao?.toString()} isReadOnly />
    </div>
  );
}

export { ViewListaDeEspera };
