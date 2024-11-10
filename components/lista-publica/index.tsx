"use client";

import React from "react";
import { TableEfetivados } from "@/components/table/table-efetivados";
import { TableListaEspera } from "@/components/table/table-lista-de-espera";
import { Button } from "@nextui-org/react";
import { CustomModal } from "@/components/molecules/modal";
import { CreateAlunoForm } from "@/components/molecules/createAlunoForm";

interface Student {
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

interface ListaPublicaProps {
  waitList: Student[];
}

export const ListaPublica = ({ waitList }: ListaPublicaProps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Espera Pública</h1>
        <Button color="success" onPress={handleOpenCreateModal}>
          Inscrever Aluno
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Alunos Efetivados</h2>
          <TableEfetivados searchQuery="" />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Lista de Espera</h2>
          <TableListaEspera searchQuery="" />
        </div>
      </div>

      <CustomModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        size="md"
        hasConfirmButton={false}
        title="Inscrição de Aluno"
        content={<CreateAlunoForm onClose={handleCloseCreateModal} />}
      />
    </div>
  );
};
