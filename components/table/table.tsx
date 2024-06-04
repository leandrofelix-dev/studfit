import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { RenderCell } from "./render-cell";
import { columns, users } from "@/mocks/data";

export const TableWrapper = () => {
  return (
    <div className=" w-full flex flex-col gap-4">
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
        <TableBody items={users}>
          {(item) => (
            <TableRow>
              {(columnKey) => (
                <TableCell>
                  {RenderCell({ user: item, columnKey: columnKey, email: item.email || '' })}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
