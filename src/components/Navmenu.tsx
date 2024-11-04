import { useEffect, useState } from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Models } from "appwrite";
import { userStore } from "../lib/zustand/userStore";
import ModalLogout from "./ModalLogout";
import { Link } from "react-router-dom";

const Navmenu = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string>("");

  const user = userStore(
    (state) => state.user as Models.User<Models.Preferences>
  );

  useEffect(() => {
    if (screen.width < 640) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        setAvatarSrc(data.results[0].picture.thumbnail);

        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Navbar className="bg-fuchsia-300/50">
      <NavbarBrand className="gap-2">
        <Link to="/">
          <img
            src="/assets/images/chat-logo.png"
            alt="Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
          />
        </Link>
        {isMobile ? null : (
          <p className="font-bold text-xl sm:text-2xl">Chatversation</p>
        )}
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem className="flex gap-2 items-center">
          {isLoading ? null : (
            <img
              src={avatarSrc}
              alt="avatar"
              className="w-10 h-10 rounded-full border-1 border-fuchsia-400"
            />
          )}

          <p className="font-bold ">{user.name}</p>
        </NavbarItem>

        <NavbarItem>
          <ModalLogout isMobile={isMobile} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Navmenu;
