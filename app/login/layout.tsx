import React from "react";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "StudFit - Login",
  description: "Academia do IFCE Cedro",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={clsx("font-sans antialiased", fontSans.className)}>
        {children}
      </body>
    </html>
  );
}
