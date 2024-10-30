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
  const user = userStore(
    (state) => state.user as Models.User<Models.Preferences>
  );

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
        <p className="font-bold text-xl sm:text-2xl">Chatversation</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>{user.name}</NavbarItem>

        <NavbarItem>
          <ModalLogout />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Navmenu;
