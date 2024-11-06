import React from "react";
import {
  Modal as NextUIModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  hasConfirmButton?: boolean;
  title: string;
  content?: React.ReactNode;
}

function CustomModal({
  isOpen,
  onClose,
  onConfirm,
  size = "md",
  hasConfirmButton = true,
  title,
  content,
}: ModalProps) {
  return (
    <NextUIModal size={size} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{content}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="bordered" onPress={onClose}>
                Fechar
              </Button>
              {hasConfirmButton && (
                <Button color="success" onPress={onConfirm}>
                  Confirmar
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </NextUIModal>
  );
}

export { CustomModal };
