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
import { communityStore } from "../lib/zustand/communityStore";
import { useKeyPress } from "../hooks/useKeyPress";

const ModalUpdateCommunity = ({
  community,
}: {
  community: Models.Document;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(community.name);
  const [desc, setDesc] = useState<string>(community.desc);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { keyDown } = useKeyPress("Enter", handleUpdateChat);

  const communityState = communityStore();

  async function handleUpdateChat() {
    setIsLoading(true);

    if (community.name === name && community.desc === desc) {
      setIsLoading(false);
      toast.error("Chat group was not updated", { theme: "colored" });
      return;
    }

    if (name.length === 0) {
      setIsLoading(false);
      toast.error("Name community was not be empty", { theme: "colored" });
      return;
    }

    databases
      .updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.communitiesCollectionId,
        community.$id,
        {
          name: name,
          desc: desc,
        }
      )
      .then((res) => {
        communityState.updateCommunity(res.$id, { name, desc });
        setIsLoading(false);
        onClose();
        toast.success("Chat group updated successfully", { theme: "colored" });
      })
      .catch((error: AppwriteException) => {
        setIsLoading(false);
        toast.error(error.message, { theme: "colored" });
      });
  }

  return (
    <>
      <Button variant="light" radius="full" onPress={onOpen} isIconOnly>
        <img src="/assets/icons/edit.svg" alt="edit" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        className="max-w-[20rem] xs:max-w-[22rem] sm:max-w-md"
      >
        <ModalContent className="bg-fuchsia-300 dark:bg-stone-700 shadow-xl shadow-rose-300 dark:shadow-xl dark:shadow-fuchsia-500">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[1.5rem]">
                Update Chat group
              </ModalHeader>
              <ModalBody className="gap-6">
                <Input
                  label="Name"
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={keyDown}
                />
                <Input
                  label="Description"
                  value={desc}
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
                  onPress={handleUpdateChat}
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

export default ModalUpdateCommunity;
