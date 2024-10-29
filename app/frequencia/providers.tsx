"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { usePathname } from "next/navigation";
import { Layout } from "../../components/layout/layout";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const pathname = usePathname();

  if (pathname === "/lista-publica" || pathname === "/login") {
    return (
      <NextUIProvider>
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          {...themeProps}
        >
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    );
  }

  return (
    <NextUIProvider>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        {...themeProps}
      >
        <Layout>{children}</Layout>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
