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

const ModalCreateCommunity = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const communityState = communityStore();

  const handleCreateCommunity = async () => {
    setIsLoading(true);

    try {
      const res = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.communitiesCollectionId,
        ID.unique(),
        {
          name: name,
          desc: desc,
        }
      );

      communityState.addCommunity(res);

      setIsLoading(false);

      onClose();

      toast.success("Chat group created successfully", { theme: "colored" });
    } catch (error) {
      const err = error as AppwriteException;
      setIsLoading(false);
      toast.error(err.message, { theme: "colored" });
    }
  };
  //   setIsLoading(true);
  //   databases
  //     .createDocument(
  //       appwriteConfig.databaseId,
  //       appwriteConfig.communitiesCollectionId,
  //       ID.unique(),
  //       {
  //         name: name,
  //         desc: desc,
  //       }
  //     )
  //     .then((res) => {
  //       communityState.addCommunity(res);
  //       setIsLoading(false);
  //       onClose();
  //       toast.success("Chat group created successfully", { theme: "colored" });
  //     })
  //     .catch((error: AppwriteException) => {
  //       setIsLoading(false);
  //       toast.error(error.message, { theme: "colored" });
  //     });
  // };

  return (
    <>
      <Button onPress={onOpen} color="danger">
        Create Chat
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
                  onPress={handleCreateCommunity}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner color="secondary" /> : "Create"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCreateCommunity;
