import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
<<<<<<< HEAD
import React from "react";
import { columns, users } from "./data";
import { RenderCell } from "./render-cell";
=======
import React, { useEffect, useState } from "react";
import { RenderCell } from "./render-cell";
import { columns } from "@/mocks/data";
import { action } from "@/config/axios";

interface Aluno {
  id: string;
  nome: string;
  email: string;
}
>>>>>>> feat/pagina-publica

export const TableWrapper = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  async function handleGetAlunos() {
    try {
      const response = await action.get("alunos/efetivados");
      if (Array.isArray(response.data.data)) {
        setAlunos(response.data.data);
      } else {
        console.error("Resposta da API não é um array:", response.data);
      }
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  }

  useEffect(() => {
    handleGetAlunos();
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
<<<<<<< HEAD
                  {RenderCell({ user: item, columnKey: columnKey })}
=======
                  {RenderCell({
                    user: item,
                    columnKey: columnKey,
                    email: item.email,
                  })}
>>>>>>> feat/pagina-publica
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
