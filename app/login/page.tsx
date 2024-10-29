"use client";

import React, { useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import { FiAlertCircle } from "react-icons/fi";
import { loginAction } from "@/actions/login";
import Image from "next/image";
import { resetTheme } from "@/utils/reset-theme";
import { AiOutlineLoading } from "react-icons/ai";
import { useRouter } from "next/navigation"; // Usar o hook correto
import { isLogged } from "@/utils/validate-token";

resetTheme();

export type LoginCredentials = {
  email: string;
  senha: string;
};

export default function Login() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    senha: "",
  });

  const [errors, setErrors] = useState<{ email?: string; senha?: string }>({});
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (isLogged()) {
      router.push("/frequencia");
    }
  }, [router]);

  function handleValidadeForm() {
    const newErrors: { email?: string; senha?: string } = {};

    if (!credentials.email) newErrors.email = "E-mail é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(credentials.email))
      newErrors.email = "E-mail inválido";

    if (!credentials.senha) newErrors.senha = "Senha é obrigatória";
    else if (credentials.senha.length < 3)
      newErrors.senha = "A senha deve ter pelo menos 3 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSaveToken(token: string) {
    localStorage.setItem("token", token);
  }

  async function handleSubmit() {
    if (!handleValidadeForm()) return;
    setIsLoading(true);
    try {
      const response = await loginAction(credentials);
      setLoginError(null);
      handleSaveToken(response.data.data.token);
      router.push("/frequencia");
      window.location.reload();
    } catch (error) {
      setLoginError(
        "Falha no login. Verifique suas credenciais e tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300/80">
      <div className="w-full max-w-lg px-6 py-10 rounded-lg bg-white">
        <div className="flex justify-center gap-10 items-center mb-6">
          <div className="flex items-center">
            <Image
              src={"/ifce.png"}
              alt={"Logo do IFCE"}
              width={120}
              height={100}
            />
          </div>
          <h1 className="text-3xl">
            <span className="font-bold">STUD</span>fit
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold mb-1">Fazer login</h1>
          <Input
            type="email"
            variant="bordered"
            label="E-mail"
            placeholder="E-mail"
            className="bg-slate-200/60 rounded-xl"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            errorMessage={errors.email}
            isInvalid={errors.email ? true : false}
          />
          <Input
            type="password"
            variant="bordered"
            label="Senha"
            placeholder="Senha"
            onChange={(e) =>
              setCredentials({ ...credentials, senha: e.target.value })
            }
            errorMessage={errors.senha}
            isInvalid={errors.senha ? true : false}
          />
          {loginError && (
            <span className="flex gap-1 text-center justify-center items-center text-sm text-danger-500">
              <FiAlertCircle />
              {loginError}
            </span>
          )}
          <Button
            className={`mt-4 rounded-lg text-white ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-success-500"}`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading className="animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
          <a
            href="#"
            className="text-center mt-2 text-slate-500 underline text-sm"
          >
            Recuperar senha
          </a>
        </div>
      </div>
    </div>
  );
}
