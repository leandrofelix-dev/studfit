import React from "react";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";
import { Providers } from "./frequencia/providers";

export const metadata: Metadata = {
  title: "StudFit",
  description: "Academia do IFCE Cedro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={clsx("font-sans antialiased", fontSans.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
