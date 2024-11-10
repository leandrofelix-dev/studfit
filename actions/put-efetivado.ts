/* eslint-disable @typescript-eslint/no-explicit-any */
import { action } from "@/config/axios";
import { Aluno } from "@/contracts/alunoDTO";
import { PTBR } from "@/shared/responses";
import { toast } from "react-toastify";

async function patchEfetivadoAction(data: Partial<Aluno>, token: string) {
  try {
    await action.patch(`alunos/efetivado/update/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success(PTBR.SUCCESS.PUT_EFETIVADOS);
  } catch (error: any) {
    toast.error(error.response.data.description);
    throw error;
  }
}

export { patchEfetivadoAction };
