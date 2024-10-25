import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@nextui-org/react";

import { account } from "../../lib/appwrite/config";
import { useStore } from "../../lib/zustand/useStore";

const Home = () => {
  const navigate = useNavigate();
  const isRendered = useRef<boolean>(false);
  const userSessionState = useStore();

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
    <div className="w-screen h-screen flex flex-col gap-5 justify-center items-center ">
      Home
      <Button size="md" color="success">
        Click
      </Button>
    </div>
  );
};

export default Home;
