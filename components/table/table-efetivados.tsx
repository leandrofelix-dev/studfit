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
}

export const TableEfetivados = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

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
                <TableCell>
                  {RenderCell({
                    user: item,
                    columnKey: columnKey,
                    email: item.email,
                  })}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <CustomModal
        isOpen={true}
        onClose={() => console.log("Fechar modal")}
        size="3xl"
        hasConfirmButton={false}
        title="Perfil"
        content={
          <ViewEfetivadoForm
            dadosEfetivado={{
              nome: "leandro felix",
              peso: 85,
              altura: 178,
              email: "contato@leandrofelix.dev.br",
              telefone: "00900000000",
              cirurgiasFeitas: "cirurgia no calcanhar",
              patologias: "nenhuma",
              mesesExperienciaMusculacao: 2,
              diagnosticoLesaoJoelho: "nenhum",
              fazUsoDeCigarro: false,
              fazUsoDeBebidaAlcoolica: true,
              praticaAtividadeFisica: false,
            }}
          />
        }
      />
    </div>
  );
};
