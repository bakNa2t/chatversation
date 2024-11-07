import { useState } from "react";
import { AppwriteException, Models } from "appwrite";
import { toast } from "react-toastify";
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

import { appwriteConfig, databases } from "../lib/appwrite/config";
import { chatStore } from "../lib/zustand/chatStore";

const ModalEditMessage = ({ chat }: { chat: Models.Document }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(chat.message);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const chatState = chatStore();

  const handleEditChat = () => {
    setIsLoading(true);

    databases
      .updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.chatboxesCollectionId,
        chat.$id,
        {
          message: message,
        }
      )
      .then((res) => {
        chatState.editChatMessage(res.$id, { message: message });
        setIsLoading(false);

        toast.success("Message edited successfully", { theme: "colored" });
        onClose();
      })
      .catch((error: AppwriteException) => {
        setIsLoading(false);
        toast.error(error.message, { theme: "colored" });
      });
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
                  label="New message"
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
                  {isLoading ? <Spinner color="secondary" /> : "Edit"}
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
