import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

const ThemeBtn = () => {
  const [theme, setTheme] = useState<string>("dark");

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
  );
};

export default ThemeBtn;
