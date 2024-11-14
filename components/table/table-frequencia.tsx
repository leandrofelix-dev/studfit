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
import { today, getLocalTimeZone, isWeekend } from "@internationalized/date";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFrequenciaAction } from "@/actions/get-frequencia";
import { DateValue } from "@nextui-org/react";
import { PTBR } from "@/shared/responses";
import { isBrowser } from "@/utils/is-browser";
import { RenderCellFrequencia } from "./render-cell-frequencia";
import { getEfetivadosAction } from "@/actions/get-efetivados";
import { sendFrequenciaCreateAction } from "@/actions/send-frequencia-create";
import { useLocale } from "@react-aria/i18n";

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

  const formatDateToBR = (dateValue: DateValue): string => {
    const [year, month, day] = dateValue.toString().split("-");
    return `${day}/${month}/${year}`;
  };

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
          const uniqueAlunos = alunosData.data.data.filter(
            (aluno: Aluno, index: number, self: Aluno[]) =>
              index === self.findIndex((a) => a.id === aluno.id)
          );
          uniqueAlunos.forEach((aluno: Aluno) => {
            frequenciaMap[aluno.id] = false;
          });
          setAlunos(uniqueAlunos);
        }
        setFrequencia(frequenciaMap);
      } catch (error) {
        console.error(PTBR.ERROR.GET_FREQUENCIA, error);
        if (isBrowser()) toast.error(PTBR.ERROR.GET_FREQUENCIA);
      }
    }

    if (data) {
      const formattedDate = formatDateToBR(data);
      fetchFrequencia(formattedDate);
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

    const formattedDate = formatDateToBR(data);
    const usuarioId = "f1d13d02-9ebe-4f38-b372-faac79e82991";
    const frequenciaData = alunos.map((aluno) => ({
      presente: frequencia[aluno.id] || false,
      aluno: { id: aluno.id },
      usuario: { id: usuarioId },
    }));

    try {
      await sendFrequenciaCreateAction(frequenciaData, formattedDate, token);
    } catch (error) {
      console.error("Erro ao enviar frequência", error);
    }
  };

  const handleDateChange = (newDate: DateValue | null) => {
    setData(newDate);
  };

  const now = today(getLocalTimeZone());

  const { locale } = useLocale();

  const isDateUnavailable = (date: DateValue) => isWeekend(date, locale);

  return (
    <div className="w-full flex gap-4 justify-around">
      <ToastContainer />

      <div className="flex flex-col">
        <Calendar
          value={data || now}
          onChange={handleDateChange}
          color="success"
          maxValue={today(getLocalTimeZone())}
          isDateUnavailable={isDateUnavailable}
          errorMessage="Não é possível enviar a frequência nos finais de semana"
        />
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
