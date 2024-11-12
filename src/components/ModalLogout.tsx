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

const ModalLogout = ({ isMobile }: { isMobile?: boolean }) => {
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
      {isMobile ? (
        <Button
          onPress={onOpen}
          radius="full"
          className="bg-transparent min-w-10 px-0 sm:min-w-10 border-2 border-transparent hover:border-fuchsia-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-log-out text-[#e879f9]"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
        </Button>
      ) : (
        <Button onPress={onOpen} color="danger" variant="flat">
          Logout
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
      >
        <ModalContent className="bg-fuchsia-300 dark:bg-stone-700 shadow-xl shadow-rose-300 dark:shadow-xl dark:shadow-fuchsia-500">
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
