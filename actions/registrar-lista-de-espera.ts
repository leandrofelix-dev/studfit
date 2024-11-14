/* eslint-disable @typescript-eslint/no-explicit-any */
import { action } from "@/config/axios";
import { PTBR } from "@/shared/responses";
import { toast } from "react-toastify";

interface CanditatoData {
  nome: string;
  email: string;
  telefone: string;
}

async function registrarListaDeEsperaAction(candidato: CanditatoData) {
  try {
    await action.post(`/alunos/lista-espera/register`, candidato, {});
    toast.success(PTBR.SUCCESS.POST_LISTA_ESPERA);
  } catch (error: any) {
    toast.error(error.response.data.description);
    throw error;
  }
}

export { registrarListaDeEsperaAction };
