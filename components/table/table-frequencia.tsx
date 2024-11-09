"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
  Calendar,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFrequenciaAction } from "@/actions/get-frequencia";
import { DateValue } from "@nextui-org/react";
import { PTBR } from "@/shared/responses";
import { isBrowser } from "@/utils/is-browser";
import { sendFrequenciaAction } from "@/actions/send-frequencia";
import { RenderCellFrequencia } from "./render-cell-frequencia";

interface Aluno {
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

interface Frequencia {
  id: string;
  data: string;
  presente: boolean;
  aluno: Aluno;
}

export const TableFrequencia = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [frequencia, setFrequencia] = useState<{ [key: string]: boolean }>({});
  const [data, setData] = useState<DateValue | null>(null);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token não encontrado");
        return;
      }

      try {
        const response = await getFrequenciaAction(token);
        const frequenciaData: Frequencia[] = response.data.data;

        const alunosData = frequenciaData.map((item) => item.aluno);
        setAlunos(alunosData);

        const frequenciaMap: { [key: string]: boolean } = {};
        frequenciaData.forEach((item) => {
          frequenciaMap[item.aluno.id] = item.presente;
        });
        setFrequencia(frequenciaMap);
      } catch (error) {
        console.error(PTBR.ERROR.GET_FREQUENCIA, error);
        if (isBrowser()) toast.error(PTBR.ERROR.GET_FREQUENCIA);
      }
    }
    fetchData();
  }, []);

  const handleCheckboxChange = (id: string) => {
    setFrequencia((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async () => {
    if (!data) {
      toast.error("Por favor, selecione uma data.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token não encontrado");
      return;
    }

    const frequenciaData = alunos.map((aluno) => ({
      id: aluno.id,
      frequencia: frequencia[aluno.id] || false,
    }));

    try {
      await sendFrequenciaAction(
        frequenciaData,
        new Date(data.toString()),
        token
      );
      toast.success("Frequência enviada com sucesso");
    } catch (error) {
      console.error("Erro ao enviar frequência", error);
      toast.error("Erro ao enviar frequência");
    }
  };

  const handleDateChange = (newDate: DateValue | null) => {
    setData(newDate);
  };

  return (
    <div className="w-full flex gap-4">
      <ToastContainer />

      <Table aria-label="Tabela de frequência dos alunos">
        <TableHeader>
          <TableColumn>Nome</TableColumn>
          <TableColumn>Frequência</TableColumn>
        </TableHeader>
        <TableBody items={alunos}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>
                <RenderCellFrequencia
                  user={item}
                  columnKey="nome"
                  onCheckboxChange={handleCheckboxChange}
                  isSelected={frequencia[item.id] || false}
                />
              </TableCell>
              <TableCell>
                <RenderCellFrequencia
                  user={item}
                  columnKey="presenca"
                  onCheckboxChange={handleCheckboxChange}
                  isSelected={frequencia[item.id] || false}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex flex-col gap-4">
        <Calendar value={data} onChange={handleDateChange} color="success" />
        <Button color="success" onPress={handleSubmit}>
          Salvar
        </Button>
      </div>
    </div>
  );
};
