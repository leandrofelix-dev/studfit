"use client";
import React, { useState, useEffect } from "react";
import { resetTheme } from "@/utils/reset-theme";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
  Chip,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoSearch } from "react-icons/io5";
import { getEfetivadosAction } from "@/actions/get-efetivados";
import { getListaDeEsperaAction } from "@/actions/get-lista-de-espera";
import { PTBR } from "@/shared/responses";
import { isBrowser } from "@/utils/is-browser";
import { CustomModal } from "@/components/molecules/modal";
import { registrarListaDeEsperaAction } from "@/actions/registrar-lista-de-espera";
import { Text } from "@/components/atoms/text";
import Image from "next/image";

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
  posicao?: number;
}

const CreateAlunoForm = ({ onClose }: { onClose: () => void }) => {
  const [nome, setNome] = useState<string>("");
  const [peso, setPeso] = useState<number | "">("");
  const [altura, setAltura] = useState<number | "">("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const candidato = { nome, email, telefone, peso, altura };

    try {
      await registrarListaDeEsperaAction(candidato);
      onClose();
    } catch (error) {
      console.error("Erro ao registrar na lista de espera", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Nome Completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <div className="flex gap-4">
        <Input
          label="Peso"
          type="number"
          value={String(peso)}
          onChange={(e) => setPeso(e.target.valueAsNumber)}
          required
        />
        <Input
          label="Altura"
          type="number"
          value={String(altura)}
          onChange={(e) => setAltura(e.target.valueAsNumber)}
          required
        />
      </div>
      <div className="flex gap-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" onPress={onClose} color="danger">
          Cancelar
        </Button>
        <Button type="submit" color="success">
          Inscrever
        </Button>
      </div>
    </form>
  );
};

const ListaDeEsperaPublica = () => {
  resetTheme();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [efetivados, setEfetivados] = useState<Aluno[]>([]);
  const [listaEspera, setListaEspera] = useState<Aluno[]>([]);
  const [filteredEfetivados, setFilteredEfetivados] = useState<Aluno[]>([]);
  const [filteredListaEspera, setFilteredListaEspera] = useState<Aluno[]>([]);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const fetchEfetivados = async () => {
    try {
      const response = await getEfetivadosAction();
      setEfetivados(response.data.data);
      setFilteredEfetivados(response.data.data);
    } catch (error) {
      console.error(PTBR.ERROR.GET_EFETIVADOS, error);
      if (isBrowser()) toast.error(PTBR.ERROR.GET_EFETIVADOS);
    }
  };

  const fetchListaEspera = async () => {
    try {
      const response = await getListaDeEsperaAction();
      setListaEspera(response.data.data);
      setFilteredListaEspera(response.data.data);
    } catch (error) {
      console.error(PTBR.ERROR.GET_LISTA_ESPERA, error);
      if (isBrowser()) toast.error(PTBR.ERROR.GET_LISTA_ESPERA);
    }
  };

  useEffect(() => {
    fetchEfetivados();
    fetchListaEspera();
  }, []);

  useEffect(() => {
    const filteredEfetivados = efetivados.filter(
      (aluno) =>
        aluno.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        aluno.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEfetivados(filteredEfetivados);

    const filteredListaEspera = listaEspera.filter(
      (aluno) =>
        aluno.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        aluno.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredListaEspera(filteredListaEspera);
  }, [searchQuery, efetivados, listaEspera]);

  const RenderCellEfetivados = ({
    user,
    columnKey,
  }: {
    user: Aluno;
    columnKey: string;
  }) => {
    switch (columnKey) {
      case "nome":
        return <User name={user.nome} description={user.email} />;
      case "status":
        return (
          <Chip size="md" variant="flat" color="primary">
            <span className="capitalize text-xs font-semibold">
              {user.status}
            </span>
          </Chip>
        );
      default:
        return null;
    }
  };

  const RenderCellListaEspera = ({
    user,
    columnKey,
  }: {
    user: Aluno;
    columnKey: string;
  }) => {
    switch (columnKey) {
      case "nome":
        return <User name={user.nome} description={user.email} />;
      case "posicao":
        return (
          <Chip
            size="md"
            variant="flat"
            color={
              [1, 2, 3, 4].includes(Number(user.colocacao))
                ? "success"
                : "default"
            }
          >
            <span className="capitalize text-xs font-semibold">
              {user.colocacao}
            </span>
          </Chip>
        );
      default:
        return null;
    }
  };

  const columnsEfetivados = [
    { name: "Nome", uid: "nome" },
    // { name: "Status", uid: "status" },
  ];

  const columnsListaEspera = [
    { name: "Posição", uid: "posicao" },
    { name: "Nome", uid: "nome" },
  ];

  return (
    <div className="container mx-auto px-20 py-12">
      <ToastContainer />

      <div className="flex justify-between my-8">
        <Image
          src={"/logo-alt.svg"}
          alt={"logo studfit"}
          width={120}
          height={40}
        />
        <div className="flex justify-between gap-4 items-center mb-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Matrículas Ativas</h2>
          <Text span className="text-gray-500">
            Lista de estudantes efetivos na academia do IFCE Campus Cedro
          </Text>
          <Table aria-label="Tabela de alunos efetivados" className="my-4">
            <TableHeader columns={columnsEfetivados}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={filteredEfetivados}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell key={columnKey}>
                      <RenderCellEfetivados user={item} columnKey={columnKey} />
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Lista de Espera</h2>
          <Text span className="text-gray-500">
            Lista de estudantes cadastrados na lista de espera da academia do
            IFCE Campus Cedro
          </Text>

          <div className="flex justify-between items-center">
            <Button color="success" onPress={handleOpenCreateModal}>
              Inscrever-se
            </Button>
          </div>

          <Table aria-label="Tabela de lista de espera" className="my-4">
            <TableHeader columns={columnsListaEspera}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={filteredListaEspera}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell key={columnKey}>
                      <RenderCellListaEspera
                        user={item}
                        columnKey={columnKey}
                      />
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <CustomModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        size="3xl"
        hasConfirmButton={false}
        title="Ficha de Inscrição"
        content={<CreateAlunoForm onClose={handleCloseCreateModal} />}
      />
    </div>
  );
};

export default ListaDeEsperaPublica;
