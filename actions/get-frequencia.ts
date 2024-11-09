import { action } from "@/config/axios";

function getFrequenciaAction(token: string) {
  return action.get("presencas", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export { getFrequenciaAction };
