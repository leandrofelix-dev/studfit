import NextLink from "next/link";
import React from "react";
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
          "flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]",
          isActive ? "bg-white/50" : "hover:bg-white/20"
        )}
      >
        <div
          className={clsx(
            title === "Frequência" && isActive
              ? "[&_svg_path]:fill-success-500"
              : title === "Frequência"
                ? "[&_svg_path]:fill-default-50"
                : isActive
                  ? "[&_svg_path]:fill-default-900"
                  : "[&_svg_path]:fill-default-50"
          )}
        >
          {icon}
        </div>
        <span
          className={clsx(
            title === "Frequência" && isActive
              ? "text-default-900"
              : title === "Frequência"
                ? "text-default-50"
                : isActive
                  ? "text-default-900"
                  : "text-default-50"
          )}
        >
          {title}
        </span>
      </div>
    </NextLink>
  );
};
