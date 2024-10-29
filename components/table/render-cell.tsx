import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
<<<<<<< HEAD
import { users } from "./data";

interface Props {
  user: (typeof users)[number];
=======

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any[number];
>>>>>>> feat/pagina-publica
  columnKey: string | React.Key;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = user[columnKey];
  switch (columnKey) {
    case "name":
      return (
        <User
          name={cellValue}
<<<<<<< HEAD
=======
          isFocusable={true}
          description={
            email ? (
              email
            ) : (
              <p className="text-default-200">Email não cadastrado.</p>
            )
          }
>>>>>>> feat/pagina-publica
        >
          {user.email}
        </User>
      );
<<<<<<< HEAD
    case "role":
      return (
        <div>
          <div>
            <span>{cellValue}</span>
          </div>
        </div>
      );
    case "turno":
=======
    case "status":
>>>>>>> feat/pagina-publica
      return (
        <Chip
          size="sm"
          variant="flat"
          color={cellValue === "Regular" ? "success" : "warning"}
        >
          <span className="capitalize text-xs font-semibold">{cellValue}</span>
        </Chip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4 ">
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
<<<<<<< HEAD
      return cellValue;
=======
      return <User name={cellValue}>{user}</User>;
>>>>>>> feat/pagina-publica
  }
};
