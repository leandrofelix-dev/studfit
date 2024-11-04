import { action } from "@/config/axios";
import { Aluno } from "@/contracts/alunoDTO";

function putEfetivadoAction(data: Aluno) {
  return action.put("alunos/efetivados", data);
}

export { putEfetivadoAction };
