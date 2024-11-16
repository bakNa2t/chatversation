import { Outlet } from "react-router-dom";
import Navmenu from "../components/Navmenu";

const RootLayout = () => {
  return (
    <div className="h-screen overflow-auto bg-fuchsia-200 dark:bg-stone-700 w-full custom-scrollbar">
      <Navmenu />

      <section className="p-4 md:py-10 md:px-40">
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayout;
