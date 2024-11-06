"use client";
import { Button, Calendar } from "@nextui-org/react";
import React from "react";
import { TableFrequencia } from "../table/table-frequencia";

export const Content = () => (
  <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="max-w-[95rem] mx-auto w-full flex gap-8">
        <TableFrequencia />
        <div className="mt-4">
          <Calendar aria-label="date" color="success" />
          <Button color="success" className="w-full">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  </div>
);
