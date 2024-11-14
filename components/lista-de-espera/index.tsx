"use client";
import React from "react";
import { TableListaEspera } from "../table/table-lista-de-espera";

export const ListaDeEspera = () => {
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Lista de Espera</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center"></div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableListaEspera />
      </div>
    </div>
  );
};
