import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { SiNintendogamecube } from "react-icons/si";
import { useAuth } from "hooks/useAuth";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { logout } from "store/user/userSlice";
import { selectScramble } from "store/scramble/scramble.slice";
import { removeToken } from "helpers/localstorage.helper";

const Header: FC = () => {
  const isAuth = useAuth();
  const username = useAppSelector((state) =>
    state.user.user?.email.charAt(0).toUpperCase()
  );
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
    <header className="bg-slate-800 p-4 flex gap-4 items-center justify-between">
      <Link to="/">
        <SiNintendogamecube size={30} />
      </Link>

      <div className="flex gap-2 text-lg flex-wrap">
        {scramble.split(" ").map((move, index) => (
          <span key={index}>{move}</span>
        ))}
      </div>

      {isAuth ? (
        <div className="flex items-center justify-center gap-2">
          <Link
            className="w-8 h-8 flex items-center font-bold justify-center rounded-full bg-[#A8B1FF] cursor-pointer"
            to={"profile"}
          >
            {username}
          </Link>
          <button className="btn btn-red" onClick={logoutHandler}>
            <FaSignOutAlt />
          </button>
        </div>
      ) : (
        <Link to={"login"} className="py-2 text-white/50 hover:text-white">
          Log In / Sign In
        </Link>
      )}
    </header>
  );
};

export default Header;
