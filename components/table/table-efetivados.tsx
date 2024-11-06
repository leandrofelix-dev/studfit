// table-efetivados.tsx

"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RenderCell } from "./render-cell";
import { columns } from "@/mocks/data";
import { getEfetivadosAction } from "@/actions/get-efetivados";
import { CustomModal } from "../molecules/modal";
import { ViewEfetivadoForm } from "../molecules/viewEfetivado";
import { EditEfetivadoForm } from "../molecules/editEfetivados";
import { PTBR } from "@/shared/responses";

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

export const TableEfetivados = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Aluno | null>(null);

  async function handleGetEfetivados() {
    try {
      const response = await getEfetivadosAction();
      setAlunos(response.data.data);
    } catch (error) {
      console.error(PTBR.ERROR.GET_EFETIVADOS, error);
    }
  }

  useEffect(() => {
    handleGetEfetivados();
  }, []);

  const handleViewProfile = (user: Aluno) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleEditUser = (user: Aluno) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedUser(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleUserUpdated = () => {
    handleGetEfetivados();
    handleCloseEditModal();
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <ToastContainer />
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
                    onEditUser={handleEditUser}
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <CustomModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        size="3xl"
        hasConfirmButton={false}
        title="Perfil do Aluno"
        content={
          selectedUser ? (
            <ViewEfetivadoForm dadosEfetivado={selectedUser} />
          ) : null
        }
      />

      <CustomModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        size="3xl"
        hasConfirmButton={false}
        title="Atualização cadastral"
        content={
          selectedUser ? (
            <EditEfetivadoForm
              dadosEfetivado={selectedUser}
              onUserUpdated={handleUserUpdated}
            />
          ) : null
        }
      />
    </div>
  );
};
