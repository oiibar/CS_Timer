import React, { useState } from "react";
import { AuthService } from "@services/auth.service.ts";
import { toast } from "react-toastify";
import { setToken } from "@helpers/localstorage.helper.ts";
import { useAppDispatch } from "@store/hooks.ts";
import { login } from "@store/user/userSlice.ts";
import { useNavigate } from "react-router-dom";

import google from "@assets/auth/google.svg";
import github from "@assets/auth/github.svg";
import emailIcon from "@assets/auth/email.svg";
import closed from "@assets/auth/closed.svg";
import open from "@assets/auth/open.svg";
import passwordIcon from "@assets/auth/password.svg";
import unlocked from "@assets/auth/unlocked.svg";

const Login: React.FC = () => {
  const [formFields, setFormFields] = useState<any>({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.login({
        email: formFields.email,
        password: formFields.password,
      });
      if (data) {
        setToken("token", data.token);
        dispatch(login(data));
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  return (
    <div className="container">
      <div className="flex items-center justify-center text-center">
        <div className="flex flex-col items-center gap-6 justify-center text-center shadow-[0_4px_12px_0px_rgba(0,0,0,0.1)] p-16 rounded-2xl bg-white text-black">
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="text-[#828282] text-xs">
            Access your speedcubing app and start practicing today
          </p>
          <form
            className="flex flex-col items-center gap-6 justify-center"
            onSubmit={loginHandler}
          >
            <div className="relative w-full">
              <input
                placeholder="Email"
                type="email"
                className="border border-[#BDBDBD] pl-10 pr-4 py-2 rounded-md w-full"
                value={formFields.email}
                onChange={(e) =>
                  setFormFields({ ...formFields, email: e.target.value })
                }
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src={emailIcon} alt="" className="w-4" />
              </div>
            </div>

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border border-[#BDBDBD] pl-10 pr-10 py-2 rounded-md w-full"
                value={formFields.password}
                onChange={(e) =>
                  setFormFields({ ...formFields, password: e.target.value })
                }
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img
                  src={showPassword ? unlocked : passwordIcon}
                  alt=""
                  className="w-4"
                />
              </div>
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <img
                  src={showPassword ? open : closed}
                  alt=""
                  className="w-4"
                />
              </div>
            </div>
            <button
              disabled={formFields.email === "" || formFields.password === ""}
              className="bg-[#2F80ED] rounded-xl px-4 py-2 text-white w-full"
              onClick={() => setIsLogin(!isLogin)}
            >
              Start Your Learning
            </button>
          </form>
          <p className="text-[#828282] text-xs">
            or continue with these social profiles
          </p>
          <div className="flex gap-4">
            <a href="">
              <img
                src={google}
                alt=""
                className="border w-8 border-[#BDBDBD] rounded-full p-2 transition duration-300 ease-in-out hover:scale-150 hover:text-white"
              />
            </a>
            <a href="">
              <img
                src={github}
                alt=""
                className="border w-8 border-[#BDBDBD] rounded-full p-2 transition duration-300 ease-in-out hover:scale-150 hover:text-white"
              />
            </a>
          </div>
          <p className="text-[#828282] text-xs mt-4">
            Don't have an account?
            <span
              onClick={() => navigate("/signup")}
              className="text-[#2F80ED] font-bold cursor-pointer"
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
