"use client";
import React from "react";
import { TableEfetivados } from "../table/table-efetivados";

export const Alunos = () => {
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Gerenciamento de Alunos</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center"></div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableEfetivados />
      </div>
    </div>
  );
};
