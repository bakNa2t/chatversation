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
import { communityStore } from "../lib/zustand/communityStore";

const ModalCreateChat = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const communityState = communityStore();

  const handleCreateChat = () => {
    setIsLoading(true);
    databases
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.communitiesCollectionId,
        ID.unique(),
        {
          name: name,
          desc: desc,
        }
      )
      .then((res) => {
        communityState.addCommunity(res);
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
        <ModalContent className="bg-fuchsia-300 backdrop-blur-sm shadow-xl shadow-rose-300">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[1.5rem]">
                Create Chat group
              </ModalHeader>
              <ModalBody className="gap-6">
                <Input
                  label="Name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Description"
                  type="text"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
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
