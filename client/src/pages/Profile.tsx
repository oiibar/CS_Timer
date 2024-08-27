import { useEffect, useState } from "react";
import closedIcon from "assets/auth/closed.svg";
import openIcon from "assets/auth/open.svg";
import passwordIcon from "assets/auth/password.svg";
import unlockedIcon from "assets/auth/unlocked.svg";
import userIcon from "assets/auth/user.svg";

const Profile = () => {
  const [formFields, setFormFields] = useState<any>({
    username: "",
    password: "",
  });
  const [passwordCheck, setPasswordCheck] = useState<any>({
    showPassword: false,
    showConfirmPassword: false,
    passwordMismatch: false,
  });

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

  return (
    <div className="container space-y-4 w-full max-w-sm mx-auto m-6 bg-white rounded-lg p-8 text-black">
      <h2 className="text-5xl font-bold text-center">Profile</h2>
      <form
        // @submit.prevent="updateProfile"
        className="space-y-4"
      >
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
            <img src={userIcon} alt="Username" className="w-4" />
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
              src={passwordCheck.showPassword ? unlockedIcon : passwordIcon}
              alt="Password"
              className="w-4"
            />
          </div>
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            <img
              src={passwordCheck.showPassword ? openIcon : closedIcon}
              alt="Password"
              className="w-4"
            />
          </div>
        </div>
        <div className="relative w-full">
          <input
            type={passwordCheck.showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            className="border border-[#BDBDBD] pl-10 pr-10 py-2 rounded-md w-full"
            value={passwordCheck.confirmPassword}
            onChange={(e) =>
              setPasswordCheck({
                ...passwordCheck,
                confirmPassword: e.target.value,
              })
            }
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <img
              src={
                passwordCheck.showConfirmPassword ? unlockedIcon : passwordIcon
              }
              alt="Confirm Password"
              className="w-4"
            />
          </div>
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={toggleConfirmPasswordVisibility}
          >
            <img
              src={passwordCheck.showConfirmPassword ? openIcon : closedIcon}
              alt="Confirm Password"
              className="w-4"
            />
          </div>
        </div>
        {passwordCheck.passwordMismatch && (
          <p className="text-red-500 text-center">Passwords do not match</p>
        )}
        <button
          type="submit"
          disabled={passwordCheck.passwordMismatch}
          className="w-full bg-slate-800 text-white py-2 px-4 rounded-md"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
