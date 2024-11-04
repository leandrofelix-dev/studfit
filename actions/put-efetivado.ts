import { action } from "@/config/axios";
import { Aluno } from "@/contracts/alunoDTO";

function putEfetivadosAction(data: Aluno) {
  return action.put("alunos/efetivados", data);
}

export { putEfetivadosAction };
