import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { RiUserAddLine } from "react-icons/ri";

interface StudentData {
  name: string;
  peso: string;
  altura: string;
  email: string;
  phone: string;
}

interface AddAlunoProps {
  onAddStudent: (student: StudentData) => void;
}

export const AddAluno: React.FC<AddAlunoProps> = ({ onAddStudent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [studentData, setStudentData] = useState<StudentData>({
    name: "",
    peso: "",
    altura: "",
    email: "",
    phone: "",
  });

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleAdd = () => {
    onAddStudent(studentData);
    onClose();
  };

  return (
    <div>
      <Button onPress={onOpen} color="success">
        <RiUserAddLine />
        Inscrever-se
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Ficha de Inscrição
          </ModalHeader>
          <ModalBody>
            <Input
              label="Nome completo"
              name="name"
              onChange={handleChange}
              variant="flat"
              placeholder=""
            />
            <Input
              label="Peso (kg)"
              name="peso"
              onChange={handleChange}
              variant="flat"
              placeholder=""
            />
            <Input
              label="Altura (cm)"
              name="altura"
              onChange={handleChange}
              variant="flat"
              placeholder=""
            />
            <Input
              label="Email"
              name="email"
              onChange={handleChange}
              variant="flat"
              placeholder=""
            />
            <Input
              label="Telefone"
              name="phone"
              onChange={handleChange}
              variant="flat"
              placeholder=""
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button color="success" onPress={handleAdd}>
              Adicionar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
