import NextLink from "next/link";
import React from "react";
import { useSidebarContext } from "../layout/layout-context";
import clsx from "clsx";

interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href?: string;
}

export const SidebarItem = ({ icon, title, isActive, href = "" }: Props) => {
  console.log("sidebar-item.tsx", title);
  return (
    <NextLink
      href={href}
      className="text-default-900 active:bg-none max-w-full"
    >
      <div
        className={clsx(
          clsx(
            "flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]",
            title !== "Frequência"
              ? "[&_svg_path]:fill-success-500"
              : "[&_svg_path]:fill-success-50"
          ),
          isActive
            ? "bg-success-100 [&_svg_path]:fill-success-500"
            : "hover:bg-default-100 [&_svg_path]:fill-success-50"
        )}
      >
        {icon}
        <span
          className={clsx(
            title === "Frequência" ? "text-success-50" : "text-default-900"
          )}
        >
          {title}
        </span>
      </div>
    </NextLink>
  );
};
