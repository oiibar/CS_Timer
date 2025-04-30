import google from "@assets/auth/google.svg";
import github from "@assets/auth/github.svg";
import emailIcon from "@assets/auth/email.svg";
import closed from "@assets/auth/closed.svg";
import open from "@assets/auth/open.svg";
import passwordIcon from "@assets/auth/password.svg";
import unlocked from "@assets/auth/unlocked.svg";
import user from "@assets/auth/user.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthService } from "@services/auth.service.ts";
import { toast } from "react-toastify";

const Signup = () => {
  const [formFields, setFormFields] = useState<any>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [passwordCheck, setPasswordCheck] = useState<any>({
    showPassword: false,
    showConfirmPassword: false,
    passwordMismatch: false,
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordCheck({
      ...passwordCheck,
      showPassword: !passwordCheck.showPassword,
    });
  };
  const toggleConfirmPasswordVisibility = () => {
    setPasswordCheck({
      ...passwordCheck,
      showConfirmPassword: !passwordCheck.showConfirmPassword,
    });
  };
  useEffect(() => {
    setPasswordCheck({
      ...passwordCheck,
      passwordMismatch: formFields.password !== formFields.confirmPassword,
    });
  }, [formFields.password, formFields.confirmPassword]);

  const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.signUp({
        email: formFields.email,
        password: formFields.password,
        username: formFields.username,
      });
      if (data) {
        toast.success("Registered successfully");
        navigate("/login");
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
          <h2 className="text-3xl font-bold">Join to CS Timer</h2>
          <p className="text-[#828282] text-xs">
            Create an account and start learning today
          </p>
          <form
            className="flex flex-col items-center gap-6 justify-center"
            onSubmit={signUpHandler}
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
                placeholder="Username"
                type="text"
                className="border border-[#BDBDBD] pl-10 pr-4 py-2 rounded-md w-full"
                value={formFields.username}
                onChange={(e) =>
                  setFormFields({ ...formFields, username: e.target.value })
                }
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src={user} alt="" className="w-4" />
              </div>
            </div>
            <div className="relative w-full">
              <input
                type={passwordCheck.showPassword ? "text" : "password"}
                placeholder="Password"
                className="border border-[#BDBDBD] pl-10 pr-10 py-2 rounded-md w-full"
                value={formFields.password}
                onChange={(e) =>
                  setFormFields({ ...formFields, password: e.target.value })
                }
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img
                  src={passwordCheck.showPassword ? unlocked : passwordIcon}
                  alt=""
                  className="w-4"
                />
              </div>
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <img
                  src={passwordCheck.showPassword ? open : closed}
                  alt=""
                  className="w-4"
                />
              </div>
            </div>
            <div className="relative w-full">
              <input
                type={passwordCheck.showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="border border-[#BDBDBD] pl-10 pr-10 py-2 rounded-md w-full"
                value={formFields.confirmPassword}
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    confirmPassword: e.target.value,
                  })
                }
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img
                  src={
                    passwordCheck.showConfirmPassword ? unlocked : passwordIcon
                  }
                  alt=""
                  className="w-4"
                />
              </div>
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                <img
                  src={passwordCheck.showConfirmPassword ? open : closed}
                  alt=""
                  className="w-4"
                />
              </div>
            </div>
            {passwordCheck.passwordMismatch && (
              <p className="text-red-500 text-xs">Passwords do not match</p>
            )}
            <button
              disabled={formFields.password !== formFields.confirmPassword}
              className="bg-[#2F80ED] rounded-xl px-4 py-2 text-white w-full"
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
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="text-[#2F80ED] font-bold cursor-pointer"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
