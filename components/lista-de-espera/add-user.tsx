import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { RiUserAddLine } from "react-icons/ri";
import React from "react";

export const AddUser = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
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
                  Inscrever aluno na lista de espera
                </ModalHeader>
                <ModalBody>
                  <Input label="Email" variant="flat" />
                  <Input label="Nome completo" variant="flat" />
                  <Input label="Telefone" variant="flat" />

                  <Input label="Password" type="password" variant="flat" />
                  <Input
                    label="Confirm Password"
                    type="password"
                    variant="flat"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="ghost" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button color="primary" onPress={onClose}>
                  Adicionar
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
