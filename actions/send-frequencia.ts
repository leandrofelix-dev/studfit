import { action } from "@/config/axios";
import { PTBR } from "@/shared/responses";
import { toast } from "react-toastify";

interface FrequenciaData {
  id: string;
  frequencia: boolean;
}

async function sendFrequenciaAction(
  frequenciaData: FrequenciaData[],
  data: Date,
  token: string
) {
  try {
    await action.post(
      "frequencia",
      { frequenciaData, data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(PTBR.SUCCESS.SEND_FREQUENCIA);
  } catch (error) {
    toast.error(PTBR.ERROR.SEND_FREQUENCIA);
    throw error;
  }
}

export { sendFrequenciaAction };
