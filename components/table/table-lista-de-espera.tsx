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
import { getListaDeEsperaAction } from "@/actions/get-lista-de-espera";
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
  fazUsoDeCigarro: boolean;
  fazUsoDeBebidaAlcoolica: boolean;
  praticaAtividadeFisica: boolean;
  faltasParaReprovar: number;
  status: string;
}

export const TableListaDeEspera = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  async function handleGetEfetivados() {
    try {
      const response = await getListaDeEsperaAction();
      setAlunos(response.data.data);
    } catch (error) {
      console.error(PTBR.ERROR.GET_EFETIVADOS, error);
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
    </div>
  );
};
