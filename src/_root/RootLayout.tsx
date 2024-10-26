import { Outlet } from "react-router-dom";
import Navmenu from "../components/Navmenu";

const RootLayout = () => {
  return (
    <div className="w-full h-full bg-fuchsia-100">
      <Navmenu />
      <Outlet />
    </div>
  );
};

export default RootLayout;
