import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { FaRegMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";

export const DarkModeSwitch = () => {
  const { setTheme, resolvedTheme } = useNextTheme();
  const isDarkTheme = resolvedTheme === "dark";

  return (
    <div className="flex justify-center items-center gap-2">
      {isDarkTheme ? <FaRegMoon /> : <LuSun />}
      <Switch
        size="sm"
        isSelected={isDarkTheme}
        onValueChange={(e) => setTheme(e ? "dark" : "light")}
      />
    </div>
  );
};
