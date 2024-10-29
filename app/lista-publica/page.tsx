"use client";
import React from "react";
import ListaPublica from "../../components/lista-publica";
import { resetTheme } from "@/utils/reset-theme";

const listaDeEsperaPublica = () => {
  resetTheme();
  const waitList = [
    {
      name: "Ana Clara da Silva",
      email: "ana.silva@example.com",
      phone: "1234567890",
      peso: "60",
      altura: "1.70",
    },
    {
      name: "José Alves",
      email: "jose.alves@example.com",
      phone: "1234567890",
      peso: "70",
      altura: "1.80",
    },
    {
      name: "Maria Oliveira",
      email: "maria.oliveira@example.com",
      phone: "1234567890",
      peso: "80",
      altura: "1.90",
    },
  ];

  return (
    <div>
      <ListaPublica waitList={waitList} />
    </div>
  );
};

export default listaDeEsperaPublica;
