import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { RiUserAddLine } from "react-icons/ri";
import React from "react";

export const AddUser = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <>
        <Button onPress={onOpen} color="success" variant="solid" radius="sm">
          <RiUserAddLine />
          Adicionar aluno
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Cadastrar Aluno
                </ModalHeader>
                <ModalBody>
                  <Input label="Email" variant="bordered" />
                  <Input label="First Name" variant="bordered" />
                  <Input label="Last Name" variant="bordered" />
                  <Input label="Phone Number" variant="bordered" />

                  <Input label="Password" type="password" variant="bordered" />
                  <Input
                    label="Confirm Password"
                    type="password"
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="ghost" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button color="success" onPress={onClose}>
                    Cadastrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
