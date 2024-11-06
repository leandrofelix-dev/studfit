// table-lista-de-espera.tsx

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
import { CustomModal } from "../molecules/modal";
import { ViewListaDeEspera } from "../molecules/viewListaDeEspera";
import { PTBR } from "@/shared/responses";
import { isBrowser } from "@/utils/is-browser";
import { deleteListaEsperaAction } from "@/actions/excluir-lista-de-espera";
import { EditListaEsperaForm } from "../molecules/editListaDeEspera";
import { getListaDeEsperaAction } from "@/actions/get-lista-de-espera";

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
}

export const TableListaEspera = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Aluno | null>(null);

  async function handleGetListaEspera() {
    try {
      const response = await getListaDeEsperaAction();
      setAlunos(response.data.data);
    } catch (error) {
      console.error(PTBR.ERROR.GET_LISTA_ESPERA, error);
      if (isBrowser()) toast.error(PTBR.ERROR.GET_LISTA_ESPERA);
    }
  }

  useEffect(() => {
    handleGetListaEspera();
  }, []);

  const handleViewProfile = (user: Aluno) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleEditUser = (user: Aluno) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (user: Aluno) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!selectedUser) return;
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token não encontrado");
      return;
    }
    try {
      await deleteListaEsperaAction(selectedUser, token);
      handleGetListaEspera();
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error(PTBR.ERROR.DELETE_LISTA_ESPERA, error);
      if (isBrowser()) {
        toast.error(PTBR.ERROR.DELETE_LISTA_ESPERA);
      }
    }
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedUser(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleUserUpdated = () => {
    handleGetListaEspera();
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
                    onDeleteUser={handleDeleteUser}
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
          selectedUser ? <ViewListaDeEspera dadosAluno={selectedUser} /> : null
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
            <EditListaEsperaForm
              dadosListaEspera={selectedUser}
              onUserUpdated={handleUserUpdated}
            />
          ) : null
        }
      />

      <CustomModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        size="md"
        hasConfirmButton={true}
        title="Confirmar Exclusão"
        onConfirm={confirmDeleteUser}
        content={
          <p>
            Você tem certeza que deseja excluir o aluno {selectedUser?.nome}?
          </p>
        }
      />
    </div>
  );
};
