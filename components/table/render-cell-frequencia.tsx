"use client";

import React from "react";
import { User, Chip, Checkbox } from "@nextui-org/react";

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
  onViewProfile: (user: Aluno) => void;
  onEditUser: (user: Aluno) => void;
  onDeleteUser: (user: Aluno) => void;
}

export const RenderCellFrequencia = ({ user, columnKey }: Props) => {
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
    default:
      return <Checkbox color="success" isSelected={true} onChange={() => {}} />;
  }
};
