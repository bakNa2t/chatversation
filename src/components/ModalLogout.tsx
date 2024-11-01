import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@nextui-org/react";

import { account } from "../lib/appwrite/config";
import { userStore } from "../lib/zustand/userStore";

const ModalLogout = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const session = userStore((state) => state.userSession) as Models.Session;

  const handleLogout = () => {
    setIsLoading(true);

    account
      .deleteSession(session?.$id)
      .then(() => {
        setIsLoading(false);
        navigate("/sign-in");
        toast.success("Logout successful", { theme: "colored" });
      })
      .catch((error: AppwriteException) => {
        setIsLoading(false);
        toast.error(error.message, { theme: "colored" });
      });
  };

  return (
    <>
      <Button onPress={onOpen} color="danger" variant="flat">
        Logout
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl font-bold">
                Logout Confirmation
              </ModalHeader>
              <ModalBody>
                <h1 className="text-xl font-semibold">Are you sure?</h1>
                <p>You will be logged out. Please confirm.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={handleLogout}
                  disabled={isLoading}
                >
                  {isLoading ? "Logouting..." : "Confirm"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalLogout;
