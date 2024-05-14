import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/user/userSlice";
import { removeToken } from "../helpers/localstorage.helper";
import { toast } from "react-toastify";
import { SiNintendogamecube } from "react-icons/si";

const Header: FC = () => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    removeToken("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="bg-slate-800 p-4 flex items-center justify-between">
      <Link to="/">
        <SiNintendogamecube size={20} />
      </Link>

      <div>
        <p>P A O D F N A P O R N Q P R N Q P N</p>
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
