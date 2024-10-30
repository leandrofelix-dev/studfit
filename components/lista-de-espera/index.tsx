"use client";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { TableListaDeEspera } from "../table/table-lista-de-espera";

export const ListaDeEspera = () => {
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Lista de Espera</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input placeholder="Buscar por nome..." />
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
      <div className="max-w-[95rem] mx-auto w-full">
        <TableListaDeEspera />
      </div>
    </div>
  );
};
