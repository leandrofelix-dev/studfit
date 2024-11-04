// render-cell.tsx

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
  peso: number;
  altura: number;
  telefone: string;
  cirurgias: string;
  patologias: string;
  meses_experiencia_musculacao: number;
  diagnostico_lesao_joelho: string;
  consumo_cigarro: boolean;
  consumo_alcool: boolean;
  pratica_exercicio_fisico: boolean;
  ausencias_consecutivas: number;
  status: string;
}

interface Props {
  user: Aluno;
  columnKey: string | React.Key;
  onViewProfile: (user: Aluno) => void;
  onEditUser: (user: Aluno) => void;
}

export const RenderCell = ({
  user,
  columnKey,
  onViewProfile,
  onEditUser,
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
    case "status":
      return (
        <Chip
          size="md"
          variant="flat"
          color={user.status === "Regular" ? "success" : "warning"}
        >
          <span className="capitalize text-xs font-semibold">
            {user.status}
          </span>
        </Chip>
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
              <button onClick={() => console.log("Excluir aluno", user.id)}>
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
