import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CommunitiesList from "../../components/CommunitiesList";
import ModalCreateCommunity from "../../components/ModalCreateCommunity";

import { account } from "../../lib/appwrite/config";
import { userStore } from "../../lib/zustand/userStore";

const Home = () => {
  const navigate = useNavigate();
  const isRendered = useRef<boolean>(false);
  const userSessionState = userStore();

  useEffect(() => {
    if (!isRendered.current) {
      account
        .get()
        .then((res) => {
          userSessionState.updateUser(res);
        })
        .catch(() => {
          userSessionState.resetState();
          navigate("/sign-in");
          toast.error("Your session has expired, please sign in again", {
            theme: "colored",
          });
        });

      isRendered.current = true;
    }
  }, []);

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
