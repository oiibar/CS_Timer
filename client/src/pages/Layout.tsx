import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "@components/Header/Header.tsx";

const Layout: FC = () => {
  return (
    <div className="text-sm p-0 min-h-screen overflow-y-hidden flex flex-col bg-slate-900 font-roboto text-white">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
