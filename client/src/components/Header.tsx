// Header.tsx

import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/user/userSlice";
import { removeToken } from "../helpers/localstorage.helper";
import { toast } from "react-toastify";
import { SiNintendogamecube } from "react-icons/si";
import { selectScramble } from "../store/scramble/scramble.slice";

const Header: FC = () => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const scramble = useAppSelector(selectScramble);

  const logoutHandler = () => {
    dispatch(logout());
    removeToken("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="bg-slate-800 p-8 flex items-center justify-between">
      <Link to="/">
        <SiNintendogamecube size={40} />
      </Link>

      <div className="flex gap-3 text-xl">
        {scramble.split(" ").map((move, index) => (
          <span key={index}>{move}</span>
        ))}
      </div>

      {isAuth ? (
        <button className="btn btn-red" onClick={logoutHandler}>
          <span>Log Out</span>
          <FaSignOutAlt />
        </button>
      ) : (
        <Link to={"auth"} className="py-2 text-white/50 hover:text-white">
          Log In / Sign In
        </Link>
      )}
    </header>
  );
};

export default Header;
