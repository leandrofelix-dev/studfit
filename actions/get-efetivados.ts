import { action } from "@/config/axios";
import { Aluno } from "@/contracts/alunoDTO";

function getEfetivadosAction(): Promise<Aluno[]> {
  return action.get("alunos/efetivados");
}

export { getEfetivadosAction };
