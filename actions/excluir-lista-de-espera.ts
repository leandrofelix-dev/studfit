import { action } from "@/config/axios";
import { Aluno } from "@/contracts/alunoDTO";
import { PTBR } from "@/shared/responses";
import { toast } from "react-toastify";

async function deleteListaEsperaAction(data: Partial<Aluno>, token: string) {
  try {
    await action.delete(`alunos/lista-espera/delete/${data.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success(PTBR.SUCCESS.DELETE_LISTA_ESPERA);
  } catch (error) {
    toast.error(PTBR.ERROR.DELETE_LISTA_ESPERA);
    throw error;
  }
}

export { deleteListaEsperaAction };
