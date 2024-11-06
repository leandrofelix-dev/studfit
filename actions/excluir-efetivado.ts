import { action } from "@/config/axios";
import { Aluno } from "@/contracts/alunoDTO";
import { PTBR } from "@/shared/responses";
import { toast } from "react-toastify";

async function deleteEfetivadoAction(data: Partial<Aluno>, token: string) {
  try {
    await action.delete(`alunos/efetivados/delete/${data.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success(PTBR.SUCCESS.DELETE_EFETIVADOS);
  } catch (error) {
    toast.error(PTBR.ERROR.DELETE_EFETIVADOS);
    throw error;
  }
}

export { deleteEfetivadoAction };
