import { useEffect, useState } from "react";

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
import { Models } from "appwrite";
import { userStore } from "../lib/zustand/userStore";
import ModalLogout from "./ModalLogout";
import { Link } from "react-router-dom";

const Navmenu = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [avatarSrc, setAvatarSrc] = useState<string>("");
  const [theme, setTheme] = useState<string>("dark");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const user = userStore(
    (state) => state.user as Models.User<Models.Preferences>
  );

  // check screen width
  useEffect(() => {
    if (screen.width < 640) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  // fetch random avatar
  useEffect(() => {
    const fetchRandomAvatar = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();

        setAvatarSrc(data.results[0].picture.thumbnail);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRandomAvatar();
  }, [setAvatarSrc]);

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

      <NavbarContent justify="end" className="gap-2">
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

          <p className="font-bold">{user.name}</p>
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
