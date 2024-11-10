"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Input,
  Button,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RenderCell } from "./render-cell";
import { columns } from "@/mocks/data";
import { getEfetivadosAction } from "@/actions/get-efetivados";
import { deleteEfetivadoAction } from "@/actions/excluir-efetivado";
import { CustomModal } from "../molecules/modal";
import { ViewEfetivadoForm } from "../molecules/viewEfetivado";
import { EditEfetivadoForm } from "../molecules/editEfetivados";
import { PTBR } from "@/shared/responses";
import { isBrowser } from "@/utils/is-browser";
import { IoSearch } from "react-icons/io5";

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
  const [filteredAlunos, setFilteredAlunos] = useState<Aluno[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Aluno | null>(null);

  async function handleGetEfetivados() {
    try {
      const response = await getEfetivadosAction();
      setAlunos(response.data.data);
      setFilteredAlunos(response.data.data);
    } catch (error) {
      console.error(PTBR.ERROR.GET_EFETIVADOS, error);
      if (isBrowser()) toast.error(PTBR.ERROR.GET_EFETIVADOS);
    }
  }

  useEffect(() => {
    handleGetEfetivados();
  }, []);

  useEffect(() => {
    const filtered = alunos.filter(
      (aluno) =>
        aluno.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        aluno.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAlunos(filtered);
  }, [searchQuery, alunos]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

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
      await deleteEfetivadoAction(selectedUser, token);
      handleGetEfetivados();
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error(PTBR.ERROR.DELETE_EFETIVADOS, error);
      if (isBrowser()) {
        toast.error(PTBR.ERROR.DELETE_EFETIVADOS);
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
    handleGetEfetivados();
    handleCloseEditModal();
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <ToastContainer />
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            placeholder="Buscar por nome ou email..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button
            color="success"
            variant="solid"
            size="md"
            className="flex items-center gap-2 text-success-50"
          >
            <IoSearch />
          </Button>
        </div>
      </div>
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
        <TableBody items={filteredAlunos}>
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
