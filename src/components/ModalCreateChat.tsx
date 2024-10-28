import { useState } from "react";
import { AppwriteException, ID } from "appwrite";
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

const ModalCreateChat = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const chatState = chatStore();

  const handleCreateChat = () => {
    setIsLoading(true);
    databases
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.communitiesCollectionId,
        ID.unique(),
        {
          name: name,
        }
      )
      .then((res) => {
        chatState.addChat(res);
        setIsLoading(false);
        onClose();
        toast.success("Chat group created successfully", { theme: "colored" });
      })
      .catch((error: AppwriteException) => {
        setIsLoading(false);
        toast.error(error.message, { theme: "colored" });
      });
  };

  return (
    <>
      <Button onPress={onOpen} color="danger">
        Create Chat
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Chat group
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={handleCreateChat}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner color="secondary" /> : "Submit"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCreateChat;
