import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout: FC = () => {
  return (
    <body className="flex flex-col bg-slate-900 font-roboto text-white">
      <Header />
      <Outlet />
    </body>
  );
};

export default Layout;
