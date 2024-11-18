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
import { useKeyPress } from "../hooks/useKeyPress";

const ModalEditMessage = ({ chat }: { chat: Models.Document }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(chat.message);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const chatState = chatStore();

  const handleEditChatMessage = async () => {
    setIsLoading(true);

    if (message.length === 0 || chat.message === message) {
      toast.error("Message was not edited", { theme: "colored" });
      setIsLoading(false);
      return;
    }

    try {
      const res = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.chatboxesCollectionId,
        chat.$id,
        {
          message: message,
        }
      );

      chatState.editChatMessage(res.$id, { message: message });

      setIsLoading(false);

      toast.success("Message edited successfully", { theme: "colored" });
      onClose();
    } catch (error) {
      const err = error as AppwriteException;
      setIsLoading(false);
      toast.error(err.message, { theme: "colored" });
    }
  };

  const { keyDown } = useKeyPress("Enter", handleEditChatMessage);

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
        className="max-w-[25rem] sm:max-w-md"
      >
        <ModalContent className="bg-fuchsia-300 dark:bg-stone-700 shadow-xl shadow-rose-300 dark:shadow-xl dark:shadow-fuchsia-500">
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
                  onKeyDown={keyDown}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={handleEditChatMessage}
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
