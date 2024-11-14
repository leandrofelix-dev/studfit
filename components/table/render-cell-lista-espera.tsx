"use client";

import React from "react";
import { User, Tooltip, Chip } from "@nextui-org/react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";

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
  posicao?: number;
}

interface Props {
  user: Aluno;
  columnKey: string | React.Key;
  onViewProfile: (user: Aluno) => void;
  onEditUser: (user: Aluno) => void;
  onDeleteUser: (user: Aluno) => void;
}

export const RenderCellListaEspera = ({
  user,
  columnKey,
  onViewProfile,
  onEditUser,
  onDeleteUser,
}: Props) => {
  const topPositions = [1, 2, 3, 4];

  switch (columnKey) {
    case "posicao":
      return (
        <Chip
          size="md"
          variant="flat"
          color={
            topPositions.includes(Number(user.colocacao))
              ? "success"
              : "default"
          }
        >
          <span className="capitalize text-xs font-semibold">
            {user.colocacao}
          </span>
        </Chip>
      );
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
    case "actions":
      return (
        <div className="flex items-end gap-4 justify-end">
          <div>
            <Tooltip content="Visualizar perfil do aluno">
              <button onClick={() => onViewProfile(user)}>
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Editar aluno" color="foreground">
              <button onClick={() => onEditUser(user)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Excluir aluno" color="danger">
              <button onClick={() => onDeleteUser(user)}>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          </div>
        </div>
      );
    default:
      return <span>{user[columnKey as keyof Aluno]}</span>;
  }
};
