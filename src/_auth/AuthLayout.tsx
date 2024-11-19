import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full bg-fuchsia-100 dark:bg-stone-800">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
