import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";

const ModalDeleteMessage = ({
  handleDeleteElement,
  nameElement,
  btnStyles,
}: {
  handleDeleteElement: () => void;
  nameElement?: string;
  btnStyles?: string;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button isIconOnly variant="light" radius="full" className={btnStyles}>
        <img
          src="/assets/icons/trash.svg"
          alt="trash"
          className="cursor-pointer"
          onClick={onOpen}
        />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
      >
        <ModalContent className="bg-fuchsia-300 shadow-xl shadow-rose-300">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl font-bold">
                Delete {nameElement}
              </ModalHeader>
              <ModalBody>
                <h1 className="text-xl font-semibold">Are you sure?</h1>
                <p>
                  This {nameElement} will be permanently deleted. Please
                  confirm.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={handleDeleteElement}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDeleteMessage;
