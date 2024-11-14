import { action } from "@/config/axios";

function getFrequenciaAction(token: string, data: string) {
  return action.get(`presencas/?data=${data}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export { getFrequenciaAction };
