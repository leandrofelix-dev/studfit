import { action } from "@/config/axios";

function excluiEfetivadosAction(id: string) {
  console.log("action delete aluno", id);
  return action.delete(`alunos/efetivados/delete/${id}`);
}

export { excluiEfetivadosAction };
