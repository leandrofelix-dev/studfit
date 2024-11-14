import { LoginCredentials } from "@/app/login/page";
import { action } from "@/config/axios";
import { toast } from "react-toastify";
import { PTBR } from "@/shared/responses";

async function loginAction({ email, senha }: LoginCredentials) {
  try {
    const response = await action.post("auth/login", { email, senha });
    toast.success(PTBR.SUCCESS.LOGIN);
    return response;
  } catch (error) {
    toast.error(PTBR.ERROR.LOGIN);
    throw error;
  }
}

export { loginAction };
