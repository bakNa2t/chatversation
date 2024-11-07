import { useState } from "react";
import { /*AppwriteException,*/ Models } from "appwrite";
// import { toast } from "react-toastify";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Spinner,
} from "@nextui-org/react";

const ModalEditMessage = ({ chat }: { chat: Models.Document }) => {
  const [isLoading /*, setIsLoading*/] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(chat.name);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleEditChat = () => {
    console.log("Message has been edited");
    onClose();
  };

  return (
    <>
      <Button
        variant="light"
        radius="full"
        onPress={onOpen}
        className="w-5 h-5 min-w-0"
        isIconOnly
      >
        <img src="/assets/icons/edit.svg" alt="edit" />
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
              <ModalHeader className="flex flex-col gap-1 text-[1.5rem]">
                Edit Chat message
              </ModalHeader>
              <ModalBody className="gap-6">
                <Input
                  label="Type message"
                  value={message}
                  type="text"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={handleEditChat}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner color="secondary" /> : "Update"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEditMessage;
