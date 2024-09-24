import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any[number];
  columnKey: string | React.Key;
  email: string;
}

export const RenderCell = ({ user, columnKey, email }: Props) => {
  const cellValue = user[columnKey];
  switch (columnKey) {
    case "nome":
      return (
        <User
          name={cellValue}
          isFocusable={true}
          description={
            email ? (
              email
            ) : (
              <p className="text-default-200">Email não cadastrado.</p>
            )
          }
        >
          {user}
        </User>
      );
    case "status":
      return (
        <Chip
          size="md"
          variant="flat"
          color={cellValue === "Regular" ? "success" : "warning"}
        >
          <span className="capitalize text-xs font-semibold">{cellValue}</span>
        </Chip>
      );
    case "actions":
      return (
        <div className="flex items-end gap-4 justify-end">
          <div>
            <Tooltip content="Visualizar perfil do aluno">
              <button
                onClick={() =>
                  console.log("Visualizar perfil do aluno", user.id)
                }
              >
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Editar aluno" color="foreground">
              <button onClick={() => console.log("Editar aluno", user.id)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div onClick={() => console.log("Excluir aluno", user.id)}>
            <Tooltip content="Excluir aluno" color="danger">
              <button>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          </div>
        </div>
      );
    default:
      return <User name={cellValue}>{user}</User>;
  }
};
