"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { RenderCell } from "./render-cell";
import { columns } from "@/mocks/data";
import { CustomModal } from "../molecules/modal";
import { getListaDeEsperaAction } from "@/actions/get-lista-de-espera";
import { ViewListaDeEspera } from "../molecules/viewListaDeEspera";
import { PTBR } from "@/shared/responses";

interface Aluno {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  peso: number;
  altura: number;
  cirurgias: string;
  patologias: string;
  meses_experiencia_musculacao: number;
  diagnostico_lesao_joelho: string;
  consumo_cigarro: boolean;
  consumo_alcool: boolean;
  pratica_exercicio_fisico: boolean;
  ausencias_consecutivas: number;
  status: string;
  colocacao?: number;
}

export const TableListaDeEspera = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Aluno | null>(null);

  async function handleGetListaDeEspera() {
    try {
      const response = await getListaDeEsperaAction();
      setAlunos(response.data.data);
    } catch (error) {
      console.error(PTBR.ERROR.GET_EFETIVADOS, error);
    }
  }

  useEffect(() => {
    handleGetListaDeEspera();
  }, []);

  const handleViewProfile = (user: Aluno) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Tabela de gerenciamento de alunos">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={alunos}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell key={columnKey}>
                  <RenderCell
                    user={item}
                    columnKey={columnKey}
                    onViewProfile={handleViewProfile}
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        size="3xl"
        hasConfirmButton={false}
        title="Perfil do Aluno"
        content={
          selectedUser ? <ViewListaDeEspera dadosAluno={selectedUser} /> : null
        }
      />
    </div>
  );
};
