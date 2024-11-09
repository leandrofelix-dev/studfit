"use client";

import React from "react";
import { User, Checkbox } from "@nextui-org/react";

interface Aluno {
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
  status?: string;
}

interface Props {
  user: Aluno;
  columnKey: string | React.Key;
  onCheckboxChange: (id: string) => void;
  isSelected: boolean;
}

export const RenderCellFrequencia = ({
  user,
  columnKey,
  onCheckboxChange,
  isSelected,
}: Props) => {
  switch (columnKey) {
    case "nome":
      return (
        <User
          name={user.nome}
          isFocusable={true}
          description={
            user.email ? (
              user.email
            ) : (
              <p className="text-default-200">Email não cadastrado.</p>
            )
          }
        />
      );
    case "presenca":
      return (
        <Checkbox
          color="success"
          isSelected={isSelected}
          onChange={() => onCheckboxChange(user.id)}
        />
      );
    default:
      return <></>;
  }
};
