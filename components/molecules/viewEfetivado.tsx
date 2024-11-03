import React from "react";
import { Text } from "../atoms/text";

type efetivado = {
  nome: string;
  peso: number;
  altura: number;
  email: string;
  telefone: string;
  cirurgiasFeitas: string;
  patologias: string;
  mesesExperienciaMusculacao: number;
  diagnosticoLesaoJoelho: string;
  fazUsoDeCigarro: boolean;
  fazUsoDeBebidaAlcoolica: boolean;
  praticaAtividadeFisica: boolean;
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
    cirurgiasFeitas,
    patologias,
    mesesExperienciaMusculacao,
    diagnosticoLesaoJoelho,
    fazUsoDeCigarro,
    fazUsoDeBebidaAlcoolica,
    praticaAtividadeFisica,
  } = dadosEfetivado;
  return (
    <div>
      <Text span semibold>
        Informações Pessoais
      </Text>

      <p>{nome}</p>
      <p>{peso}</p>
      <p>{altura}</p>
      <p>{email}</p>
      <p>{telefone}</p>
      <p>{cirurgiasFeitas}</p>
      <p>{patologias}</p>
      <p>{mesesExperienciaMusculacao}</p>
      <p>{diagnosticoLesaoJoelho}</p>
      <p>{fazUsoDeCigarro}</p>
      <p>{fazUsoDeBebidaAlcoolica}</p>
      <p>{praticaAtividadeFisica}</p>
    </div>
  );
}

export { ViewEfetivadoForm };
