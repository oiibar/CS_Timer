import { FC } from "react";
import { Link } from "react-router-dom";
import { SiNintendogamecube } from "react-icons/si";
import Scrumble from "./Scrumble.tsx";
import Account from "./Account.tsx";

const Header: FC = () => {
  return (
    <header className="bg-slate-800 p-4 flex gap-4 items-center justify-between">
      <Link to="/">
        <SiNintendogamecube size={30} />
      </Link>
      <Scrumble />
      <Account />
    </header>
  );
};

export default Header;
