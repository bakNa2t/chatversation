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
  handleDeleteMessage,
}: {
  handleDeleteMessage: () => void;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <img
        src="/assets/icons/trash.svg"
        alt="trash"
        className="cursor-pointer"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl font-bold">
                Delete Message
              </ModalHeader>
              <ModalBody>
                <h1 className="text-xl font-semibold">Are you sure?</h1>
                <p>This message will be permanently deleted. Please confirm.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={handleDeleteMessage}>
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
