/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Input, Checkbox, Button } from "@nextui-org/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { patchEfetivadoAction } from "@/actions/put-efetivado";
import { PTBR } from "@/shared/responses";

interface Aluno {
  id: string;
  nome: string;
  email: string;
  peso: number;
  altura: number;
  telefone: string;
  cirurgias: string;
  patologias: string;
  meses_experiencia_musculacao: number;
  diagnostico_lesao_joelho: string;
  consumo_cigarro: boolean;
  consumo_alcool: boolean;
  pratica_exercicio_fisico: boolean;
  ausencias_consecutivas: number;
  status: string;
}

interface EditEfetivadoFormProps {
  dadosEfetivado: Aluno;
  onUserUpdated: () => void;
}

export const EditEfetivadoForm: React.FC<EditEfetivadoFormProps> = ({
  dadosEfetivado,
  onUserUpdated,
}) => {
  const [formData, setFormData] = useState<Partial<Aluno>>({
    ...dadosEfetivado,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Aluno
  ) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const updatedData = {
        ...formData,
        status: dadosEfetivado.status,
        ausencias_consecutivas: dadosEfetivado.ausencias_consecutivas,
      };

      await patchEfetivadoAction(updatedData, token);
      onUserUpdated();
    } catch (error) {
      console.error(PTBR.ERROR.PUT_EFETIVADOS, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <ToastContainer />
      <Input
        className="bg-gray-200/60 rounded-xl"
        variant="bordered"
        label="Nome"
        value={formData.nome}
        onChange={(e) => handleInputChange(e, "nome")}
      />
      <div className="flex gap-2">
        <Input
          className="bg-gray-200/60 rounded-xl"
          variant="bordered"
          label="Peso"
          type="number"
          value={String(formData.peso)}
          onChange={(e) => handleInputChange(e, "peso")}
        />
        <Input
          className="bg-gray-200/60 rounded-xl"
          variant="bordered"
          label="Altura"
          type="number"
          value={String(formData.altura)}
          onChange={(e) => handleInputChange(e, "altura")}
        />
      </div>
      <div className="flex gap-2">
        <Input
          className="bg-gray-200/60 rounded-xl"
          variant="bordered"
          label="Email"
          value={formData.email}
          onChange={(e) => handleInputChange(e, "email")}
        />
        <Input
          className="bg-gray-200/60 rounded-xl"
          variant="bordered"
          label="Telefone"
          value={formData.telefone}
          onChange={(e) => handleInputChange(e, "telefone")}
        />
      </div>

      <Input
        className="bg-gray-200/60 rounded-xl"
        variant="bordered"
        label="Cirurgias"
        value={formData.cirurgias}
        onChange={(e) => handleInputChange(e, "cirurgias")}
      />
      <Input
        className="bg-gray-200/60 rounded-xl"
        variant="bordered"
        label="Patologias"
        value={formData.patologias}
        onChange={(e) => handleInputChange(e, "patologias")}
      />
      <div className="flex gap-2">
        <Input
          className="bg-gray-200/60 rounded-xl"
          variant="bordered"
          label="Meses de Experiência em Musculação"
          type="number"
          value={String(formData.meses_experiencia_musculacao)}
          onChange={(e) => handleInputChange(e, "meses_experiencia_musculacao")}
        />
        <Input
          className="bg-gray-200/60 rounded-xl"
          variant="bordered"
          label="Diagnóstico de Lesão no Joelho"
          value={formData.diagnostico_lesao_joelho}
          onChange={(e) => handleInputChange(e, "diagnostico_lesao_joelho")}
        />
      </div>
      <div className="flex gap-2 flex-col">
        <Checkbox
          color="success"
          isSelected={formData.consumo_cigarro}
          onChange={(e) => handleInputChange(e as any, "consumo_cigarro")}
        >
          Faz uso de cigarro?
        </Checkbox>
        <Checkbox
          color="success"
          isSelected={formData.consumo_alcool}
          onChange={(e) => handleInputChange(e as any, "consumo_alcool")}
        >
          Consome bebidas alcoólicas?
        </Checkbox>
        <Checkbox
          color="success"
          isSelected={formData.pratica_exercicio_fisico}
          onChange={(e) =>
            handleInputChange(e as any, "pratica_exercicio_fisico")
          }
        >
          Pratica atividades físicas?
        </Checkbox>
      </div>
      <Button color="success" isLoading={isSubmitting} onPress={handleUpdate}>
        Salvar
      </Button>
    </div>
  );
};
