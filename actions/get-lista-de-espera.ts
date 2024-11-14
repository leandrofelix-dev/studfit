import { action } from "@/config/axios"; 

function getListaDeEsperaAction() {
    return action.get("alunos/lista-espera")
}

export { getListaDeEsperaAction };	