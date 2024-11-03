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
import { getEfetivadosAction } from "@/actions/get-efetivados";
import { CustomModal } from "../molecules/modal";
import { ViewEfetivadoForm } from "../molecules/viewEfetivado";

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
  fazUsoDeCigarro: boolean;
  fazUsoDeBebidaAlcoolica: boolean;
  praticaAtividadeFisica: boolean;
  faltasParaReprovar: number;
  status: string;
}

export const TableEfetivados = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Aluno | null>(null);

  async function handleGetEfetivados() {
    try {
      const response = await getEfetivadosAction();
      setAlunos(response.data.data);
    } catch (error) {
      console.error("Ocorreu um erro ao buscar os alunos efetivados", error);
    }
  }

  useEffect(() => {
    handleGetEfetivados();
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
          selectedUser ? (
            <ViewEfetivadoForm dadosEfetivado={selectedUser} />
          ) : null
        }
      />
    </div>
  );
};
