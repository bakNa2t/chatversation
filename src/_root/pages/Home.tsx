import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CommunitiesList from "../../components/CommunitiesList";
import ModalCreateCommunity from "../../components/ModalCreateCommunity";

import { account } from "../../lib/appwrite/config";
import { userStore } from "../../lib/zustand/userStore";
import { Spinner } from "@nextui-org/react";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const isRendered = useRef<boolean>(false);
  const userSessionState = userStore();

  useEffect(() => {
    if (!isRendered.current) {
      setIsLoading(true);

      account
        .get()
        .then((res) => {
          userSessionState.updateUser(res);
          setIsLoading(false);
        })
        .catch(() => {
          userSessionState.resetState();
          navigate("/sign-in");
          toast.error("Your session has expired, please sign in again", {
            theme: "colored",
          });
          setIsLoading(false);
        });

      isRendered.current = true;
    }
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Spinner color="secondary" />
      </div>
    );

  return (
    <>
      <div className="flex justify-end">
        <ModalCreateCommunity />
      </div>
      <CommunitiesList />
    </>
  );
};

export default Home;
