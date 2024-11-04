/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Input, Checkbox, Button } from "@nextui-org/react";
import { putEfetivadoAction } from "@/actions/put-efetivado";

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
  const [formData, setFormData] = useState<Aluno>({ ...dadosEfetivado });
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
      await putEfetivadoAction(formData);
      onUserUpdated();
    } catch (error) {
      console.error("Erro ao atualizar o aluno", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Nome"
        value={formData.nome}
        onChange={(e) => handleInputChange(e, "nome")}
      />
      <Input
        label="Email"
        value={formData.email}
        onChange={(e) => handleInputChange(e, "email")}
      />
      <Input
        label="Telefone"
        value={formData.telefone}
        onChange={(e) => handleInputChange(e, "telefone")}
      />
      <Input
        label="Peso"
        type="number"
        value={String(formData.peso)}
        onChange={(e) => handleInputChange(e, "peso")}
      />
      <Input
        label="Altura"
        type="number"
        value={String(formData.altura)}
        onChange={(e) => handleInputChange(e, "altura")}
      />
      <Input
        label="Cirurgias"
        value={formData.cirurgias}
        onChange={(e) => handleInputChange(e, "cirurgias")}
      />
      <Input
        label="Patologias"
        value={formData.patologias}
        onChange={(e) => handleInputChange(e, "patologias")}
      />
      <Input
        label="Meses de Experiência em Musculação"
        type="number"
        value={String(formData.meses_experiencia_musculacao)}
        onChange={(e) => handleInputChange(e, "meses_experiencia_musculacao")}
      />
      <Input
        label="Diagnóstico de Lesão no Joelho"
        value={formData.diagnostico_lesao_joelho}
        onChange={(e) => handleInputChange(e, "diagnostico_lesao_joelho")}
      />
      <div className="flex gap-4">
        <Checkbox
          isSelected={formData.consumo_cigarro}
          onChange={(e) => handleInputChange(e as any, "consumo_cigarro")}
        >
          Consumo de Cigarro
        </Checkbox>
        <Checkbox
          isSelected={formData.consumo_alcool}
          onChange={(e) => handleInputChange(e as any, "consumo_alcool")}
        >
          Consumo de Álcool
        </Checkbox>
        <Checkbox
          isSelected={formData.pratica_exercicio_fisico}
          onChange={(e) =>
            handleInputChange(e as any, "pratica_exercicio_fisico")
          }
        >
          Prática de Exercícios Físicos
        </Checkbox>
      </div>
      <Input
        label="Ausências Consecutivas"
        type="number"
        value={String(formData.ausencias_consecutivas)}
        onChange={(e) => handleInputChange(e, "ausencias_consecutivas")}
      />
      <Input
        label="Status"
        value={formData.status}
        onChange={(e) => handleInputChange(e, "status")}
      />
      <Button color="success" isLoading={isSubmitting} onPress={handleUpdate}>
        Atualizar
      </Button>
    </div>
  );
};
