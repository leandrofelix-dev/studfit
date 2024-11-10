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
import { RenderCellFrequencia } from "./render-cell-frequencia";
import { getEfetivadosAction } from "@/actions/get-efetivados";
import { sendFrequenciaCreateAction } from "@/actions/send-frequencia-create";

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
    async function fetchAlunos() {
      try {
        const response = await getEfetivadosAction();
        setAlunos(response.data.data);
      } catch (error) {
        console.error("Erro ao obter alunos", error);
        if (isBrowser()) toast.error("Erro ao obter alunos");
      }
    }
    fetchAlunos();
  }, []);

  useEffect(() => {
    async function fetchFrequencia(selectedDate: string) {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token não encontrado");
        return;
      }

      try {
        const response = await getFrequenciaAction(token, selectedDate);
        const frequenciaData: Frequencia[] = response.data.data;

        const frequenciaMap: { [key: string]: boolean } = {};
        if (frequenciaData.length > 0) {
          const alunosData = frequenciaData.map((item) => item.aluno);
          frequenciaData.forEach((item) => {
            frequenciaMap[item.aluno.id] = item.presente;
          });
          setAlunos(alunosData);
        } else {
          const alunosData = await getEfetivadosAction();
          alunosData.data.data.forEach((aluno: Aluno) => {
            frequenciaMap[aluno.id] = false;
          });
          setAlunos(alunosData.data.data);
        }
        setFrequencia(frequenciaMap);
      } catch (error) {
        console.error(PTBR.ERROR.GET_FREQUENCIA, error);
        if (isBrowser()) toast.error(PTBR.ERROR.GET_FREQUENCIA);
      }
    }

    if (data) {
      const selectedDate = new Date(data.toString()).toLocaleDateString(
        "pt-BR"
      );
      fetchFrequencia(selectedDate);
    }
  }, [data]);

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

    const selectedDate = new Date(data.toString()).toLocaleDateString("pt-BR");
    const usuarioId = "f1d13d02-9ebe-4f38-b372-faac79e82991";
    const frequenciaData = alunos.map((aluno) => ({
      presente: frequencia[aluno.id] || false,
      aluno: { id: aluno.id },
      usuario: { id: usuarioId },
    }));

    try {
      await sendFrequenciaCreateAction(frequenciaData, selectedDate, token);
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
    <div className="w-full flex gap-4 justify-around">
      <ToastContainer />

      <div className="flex flex-col">
        <Calendar value={data} onChange={handleDateChange} color="success" />
        <Button color="success" onPress={handleSubmit}>
          Salvar
        </Button>
      </div>

      <Table aria-label="Tabela de frequência dos alunos">
        <TableHeader>
          <TableColumn>Nome</TableColumn>
          <TableColumn>Presença</TableColumn>
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
    </div>
  );
};
