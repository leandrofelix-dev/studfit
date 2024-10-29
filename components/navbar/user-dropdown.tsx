import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { BiLogOut } from "react-icons/bi";

export const UserDropdown = () => {
  const router = useRouter();
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar as="button" color="default" size="md" />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login"); 
          }}
        >
          <div className="flex items-center justify-start gap-2">
            <BiLogOut />
            Desconectar-se
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
