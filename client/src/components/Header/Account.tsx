import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "@hooks/useAuth.ts";
import { useAppDispatch } from "@store/hooks.ts";
import { logout } from "@store/user/userSlice.ts";
import { removeToken } from "@helpers/localstorage.helper.ts";

const Account: FC = () => {
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
        <>
            {isAuth ? (
                <div className="flex items-center justify-center gap-2">
                    <Link
                        className="w-8 h-8 flex items-center font-bold justify-center rounded-full bg-[#A8B1FF] cursor-pointer"
                        to="profile"
                    >
                        A
                    </Link>
                    <button className="btn btn-red" onClick={logoutHandler}>
                        <FaSignOutAlt />
                    </button>
                </div>
            ) : (
                <Link to="login" className="py-2 text-white/50 hover:text-white">
                    Log In / Sign In
                </Link>
            )}
        </>
    );
};

export default Account;
