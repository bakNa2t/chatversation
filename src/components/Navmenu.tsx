import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Models } from "appwrite";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import ModalLogout from "./ModalLogout";

import { userStore } from "../lib/zustand/userStore";
import { useMobileScreen } from "../hooks/useMobileScreen";
import { avatars } from "../lib/appwrite/config";

const Navmenu = () => {
  const [avatarSrc, setAvatarSrc] = useState<string>("");
  const [theme, setTheme] = useState<string>("dark");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { isMobile } = useMobileScreen();

  const user = userStore(
    (state) => state.user as Models.User<Models.Preferences>
  );

  // fetch user avatar from appwrite
  useEffect(() => {
    const fetchUserAvatar = () => {
      try {
        const res = avatars.getInitials(user.name);

        setAvatarSrc(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserAvatar();
  }, [user, setAvatarSrc]);

  //toggle theme mode
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeApp = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Navbar
      className="bg-fuchsia-300/50 dark:bg-stone-800/50"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
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
      </NavbarContent>

      <NavbarContent justify="end" className="sm:gap-6">
        <NavbarItem className="flex flex-shrink-0 gap-2 sm:gap-3 items-center">
          {avatarSrc === "" ? (
            <img
              src="/assets/images/default-user.png"
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-fuchsia-500 shadow-fuchsia_medium"
            />
          ) : (
            <img
              src={avatarSrc}
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-fuchsia-500 shadow-fuchsia_medium"
            />
          )}

          <p className="sm:text-lg font-bold drop-shadow-base_drk dark:drop-shadow-base_lgt">
            {user.name}
          </p>
        </NavbarItem>

        <NavbarItem className="hidden sm:flex">
          <ModalLogout isMobile={isMobile} />
        </NavbarItem>

        <NavbarItem className="hidden sm:flex">
          <Button
            radius="full"
            className="bg-transparent min-w-10 px-0 sm:min-w-10 border-2 border-transparent hover:border-fuchsia-400"
            onPress={handleThemeApp}
          >
            <img
              src={
                theme === "dark"
                  ? "/assets/icons/theme-light.svg"
                  : "/assets/icons/theme-dark.svg"
              }
              alt="theme-mode"
              className="w-8 h-8 p-1 sm:p-[0.25rem]"
            />
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="pt-6">
        <NavbarMenuItem>
          <div className="flex gap-2 items-center">
            <ModalLogout isMobile={isMobile} />
            <p className="font-semibold">Logout</p>
          </div>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <div className="flex gap-2 items-center">
            <Button
              radius="full"
              className="bg-transparent min-w-10 px-0 sm:min-w-10 border-2 border-transparent hover:border-fuchsia-400"
              onPress={handleThemeApp}
            >
              <img
                src={
                  theme === "dark"
                    ? "/assets/icons/theme-light.svg"
                    : "/assets/icons/theme-dark.svg"
                }
                alt="theme-mode"
                className="w-8 h-8 p-1 sm:p-[0.25rem]"
              />
            </Button>
            <p className="font-semibold">Theme Mode</p>
          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Navmenu;
