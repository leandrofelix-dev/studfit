import React from "react";
import { Text } from "../atoms/text";
import { Checkbox, Input, Progress } from "@nextui-org/react";

type efetivado = {
  nome: string;
  peso: number;
  altura: number;
  email: string;
  telefone: string;
  cirurgias: string;
  patologias: string;
  meses_experiencia_musculacao: number;
  diagnostico_lesao_joelho: string;
  consumo_cigarro: boolean;
  consumo_alcool: boolean;
  pratica_exercicio_fisico: boolean;
  ausencias_consecutivas: number;
};

interface ViewEfetivadoFormProps {
  dadosEfetivado: efetivado;
}

function ViewEfetivadoForm({ dadosEfetivado }: ViewEfetivadoFormProps) {
  const {
    nome,
    peso,
    altura,
    email,
    telefone,
    cirurgias,
    patologias,
    meses_experiencia_musculacao,
    diagnostico_lesao_joelho,
    consumo_cigarro,
    consumo_alcool,
    pratica_exercicio_fisico,
    ausencias_consecutivas,
  } = dadosEfetivado;

  const maxFaltas = 5;
  const faltasUsadas = ausencias_consecutivas;
  const progresso = (faltasUsadas / maxFaltas) * 100;

  let corBarra: "success" | "warning" | "danger";

  if (ausencias_consecutivas >= 4) corBarra = "danger";
  else if (ausencias_consecutivas >= 2 && ausencias_consecutivas <= 3)
    corBarra = "warning";
  else corBarra = "success";

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Text span regular className="text-gray-600 text-md">
            Informações pessoais
          </Text>

          <div className="flex flex-col gap-2">
            <Input
              type="text"
              variant="bordered"
              label="Nome Completo"
              className="bg-gray-200/60 rounded-xl"
              value={nome}
              contentEditable={false}
              disabled
            />

            <div className="flex gap-2">
              <Input
                type="number"
                variant="bordered"
                label="Peso"
                className="bg-gray-200/60 rounded-xl"
                value={String(peso)}
                contentEditable={false}
                disabled
              />

              <Input
                type="number"
                variant="bordered"
                label="Altura"
                className="bg-gray-200/60 rounded-xl"
                value={String(altura)}
                contentEditable={false}
                disabled
              />
            </div>

            <div className="flex gap-2">
              <Input
                type="email"
                variant="bordered"
                label="E-mail"
                className="bg-gray-200/60 rounded-xl"
                value={email}
                contentEditable={false}
                disabled
              />

              <Input
                type="tel"
                variant="bordered"
                label="Telefone"
                className="bg-gray-200/60 rounded-xl"
                value={telefone}
                contentEditable={false}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Text span regular className="text-gray-600 text-md">
            Anamnese
          </Text>

          <div className="flex flex-col gap-2">
            <Input
              type="text"
              variant="bordered"
              label="Cirurgias feitas"
              className="bg-gray-200/60 rounded-xl"
              value={cirurgias}
              contentEditable={false}
              disabled
            />

            <Input
              type="text"
              variant="bordered"
              label="Patologias"
              className="bg-gray-200/60 rounded-xl"
              value={patologias}
              contentEditable={false}
              disabled
            />
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              variant="bordered"
              label="Tempo de experiência com musculação (meses)"
              className="bg-gray-200/60 rounded-xl"
              value={`${meses_experiencia_musculacao} meses`}
              contentEditable={false}
              disabled
            />

            <Input
              type="text"
              variant="bordered"
              label="Diagnosticado com lesão no joelho"
              className="bg-gray-200/60 rounded-xl"
              value={diagnostico_lesao_joelho}
              contentEditable={false}
              disabled
            />
          </div>
        </div>
        <div className="flex gap-1 flex-col">
          <Checkbox isSelected={consumo_cigarro} color="success">
            <Text span className="text-gray-600">
              Faz uso de cigarro?
            </Text>
          </Checkbox>
          <Checkbox isSelected={consumo_alcool} color="success">
            <Text span className="text-gray-600">
              Faz uso de bebidas alcoólicas?
            </Text>
          </Checkbox>
          <Checkbox isSelected={pratica_exercicio_fisico} color="success">
            <Text span className="text-gray-600">
              Pratica atividades físicas?
            </Text>
          </Checkbox>
        </div>
        <div className="flex flex-col gap-2">
          <Text>
            Faltam{" "}
            <Text span bold>
              {maxFaltas - ausencias_consecutivas} faltas
            </Text>{" "}
            para remoção do aluno da academia.
          </Text>
          <Progress
            aria-label="Progresso de faltas"
            value={progresso}
            color={corBarra}
            className="max-w-full"
          />
        </div>
      </div>
    </div>
  );
}

export { ViewEfetivadoForm };