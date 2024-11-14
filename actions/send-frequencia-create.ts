/* eslint-disable @typescript-eslint/no-explicit-any */
import { action } from "@/config/axios";
import { PTBR } from "@/shared/responses";
import { toast } from "react-toastify";

interface FrequenciaData {
  presente: boolean;
  aluno: { id: string };
  usuario: { id: string };
}

async function sendFrequenciaCreateAction(
  frequenciaData: FrequenciaData[],
  data: string,
  token: string
) {
  try {
    await action.post(`/presencas/create?data=${data}`, frequenciaData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success(PTBR.SUCCESS.SEND_FREQUENCIA);
  } catch (error: any) {
    toast.error(error.response.data.description);
    throw error;
  }
}

export { sendFrequenciaCreateAction };
