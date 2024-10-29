import React from "react";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "../frequencia/providers";

export const metadata: Metadata = {
  title: "Login - StudFit",
  description: "Academia do IFCE Cedro",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
