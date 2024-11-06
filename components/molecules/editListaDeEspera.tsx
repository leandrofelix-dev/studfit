/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Input, Checkbox, Button } from "@nextui-org/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { PTBR } from "@/shared/responses";
import { isBrowser } from "@/utils/is-browser";
import { patchListaDeEsperaAction } from "@/actions/put-efetivado copy";

interface AlunoListaEspera {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  peso?: number;
  altura?: number;
  cirurgias?: string;
  patologias?: string;
  mesesExperienciaMusculacao?: number;
  diagnosticoLesaoJoelho?: string;
  consumoCigarro?: boolean;
  consumoAlcool?: boolean;
  praticaExercicioFisico?: boolean;
  colocacao?: number;
}

interface EditListaEsperaFormProps {
  dadosListaEspera: AlunoListaEspera;
  onUserUpdated: () => void;
}

export const EditListaEsperaForm: React.FC<EditListaEsperaFormProps> = ({
  dadosListaEspera,
  onUserUpdated,
}) => {
  const [formData, setFormData] = useState<Partial<AlunoListaEspera>>({
    ...dadosListaEspera,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof AlunoListaEspera
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
      };

      await patchListaDeEsperaAction(updatedData, token);
      onUserUpdated();
      toast.success("Aluno na lista de espera atualizado com sucesso");
    } catch (error) {
      console.error(PTBR.ERROR.PUT_LISTA_ESPERA, error);
      if (isBrowser())
        toast.error("Erro ao atualizar aluno na lista de espera");
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
          value={String(formData.mesesExperienciaMusculacao)}
          onChange={(e) => handleInputChange(e, "mesesExperienciaMusculacao")}
        />
        <Input
          className="bg-gray-200/60 rounded-xl"
          variant="bordered"
          label="Diagnóstico de Lesão no Joelho"
          value={formData.diagnosticoLesaoJoelho}
          onChange={(e) => handleInputChange(e, "diagnosticoLesaoJoelho")}
        />
      </div>
      <div className="flex gap-2 flex-col">
        <Checkbox
          color="success"
          isSelected={formData.consumoCigarro}
          onChange={(e) => handleInputChange(e as any, "consumoCigarro")}
        >
          Faz uso de cigarro?
        </Checkbox>
        <Checkbox
          color="success"
          isSelected={formData.consumoAlcool}
          onChange={(e) => handleInputChange(e as any, "consumoAlcool")}
        >
          Consome bebidas alcoólicas?
        </Checkbox>
        <Checkbox
          color="success"
          isSelected={formData.praticaExercicioFisico}
          onChange={(e) =>
            handleInputChange(e as any, "praticaExercicioFisico")
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
