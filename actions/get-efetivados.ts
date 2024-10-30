import { action } from "@/config/axios"; 

function getEfetivadosAction() {
    return action.get("alunos/efetivados")
}

  export { getEfetivadosAction };	