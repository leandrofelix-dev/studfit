import { LoginCredentials } from "@/app/login/page";
import { action } from "@/config/axios";

function loginAction({ email, senha }: LoginCredentials) {
  return action.post("auth/login", { email, senha });
}

export { loginAction };
