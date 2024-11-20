import { Outlet } from "react-router-dom";

import ThemeBtn from "../components/ThemeBtn";

const AuthLayout = () => {
  return (
    <div className="relative w-full bg-fuchsia-100 dark:bg-stone-800">
      <div className="absolute top-2 right-2">
        <ThemeBtn />
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
