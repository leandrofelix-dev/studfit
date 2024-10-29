import React from "react";
import ListaPublica from "../../components/lista-publica";

const listaDeEsperaPublica = () => {
  const waitList = [
    { name: "Ana Clara da Silva", email: "ana.silva@example.com" },
    { name: "José Alves", email: "jose.alves@example.com" },
    { name: "Maria Oliveira", email: "maria.oliveira@example.com" },
  ];

  return (
    <div>
      <ListaPublica waitList={waitList} />
    </div>
  );
};

export default listaDeEsperaPublica;
