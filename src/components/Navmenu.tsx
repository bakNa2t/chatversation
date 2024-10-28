import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Models } from "appwrite";
import { userStore } from "../lib/zustand/userStore";
import ModalLogout from "./ModalLogout";

const Navmenu = () => {
  const user = userStore(
    (state) => state.user as Models.User<Models.Preferences>
  );

  return (
    <Navbar>
      <NavbarBrand>
        <img
          src="/assets/images/chat-logo.png"
          alt="Logo"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
        />
        <p className="font-bold text-inherit">Chatversation</p>
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
