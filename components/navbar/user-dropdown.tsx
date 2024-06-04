import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import { BiLogOut } from "react-icons/bi";

export const UserDropdown = () => {
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            color="default"
            size="md"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem key="logout" color="danger" className="text-danger">
          <div className="flex items-center justify-start gap-2">
            <BiLogOut />
            Desconectar-se
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
