import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full bg-fuchsia-100">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
