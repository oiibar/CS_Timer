import { useState } from "react";
import closedIcon from "assets/auth/closed.svg";
import openIcon from "assets/auth/open.svg";
import passwordIcon from "assets/auth/password.svg";
import unlockedIcon from "assets/auth/unlocked.svg";
import userIcon from "assets/auth/user.svg";

const Profile = () => {
  const [formFields, setFormFields] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const passwordMismatch = Boolean(
      formFields.password &&
      formFields.confirmPassword &&
      formFields.password !== formFields.confirmPassword
  );


  return (
      <div className="container space-y-4 w-full max-w-sm mx-auto m-6 bg-white rounded-lg p-8 text-black">
        <h2 className="text-5xl font-bold text-center">Profile</h2>
        <form className="space-y-4">
          <div className="relative w-full">
            <input
                name="username"
                placeholder="Username"
                type="text"
                className="border border-[#BDBDBD] pl-10 pr-4 py-2 rounded-md w-full"
                value={formFields.username}
                onChange={handleChange}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src={userIcon} alt="Username" className="w-4" />
            </div>
          </div>

          <PasswordField
              name="password"
              placeholder="Password"
              value={formFields.password}
              show={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
              onChange={handleChange}
          />

          <PasswordField
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formFields.confirmPassword}
              show={showConfirmPassword}
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              onChange={handleChange}
          />

          {passwordMismatch && (
              <p className="text-red-500 text-center">Passwords do not match</p>
          )}

          <button
              type="submit"
              disabled={passwordMismatch}
              className="w-full bg-slate-800 text-white py-2 px-4 rounded-md"
          >
            Update Profile
          </button>
        </form>
      </div>
  );
};

interface PasswordFieldProps {
  name: string;
  placeholder: string;
  value: string;
  show: boolean;
  onToggle: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField = ({
                         name,
                         placeholder,
                         value,
                         show,
                         onToggle,
                         onChange,
                       }: PasswordFieldProps) => (
    <div className="relative w-full">
      <input
          name={name}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="border border-[#BDBDBD] pl-10 pr-10 py-2 rounded-md w-full"
          value={value}
          onChange={onChange}
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <img src={show ? unlockedIcon : passwordIcon} alt={placeholder} className="w-4" />
      </div>
      <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={onToggle}
      >
        <img src={show ? openIcon : closedIcon} alt={placeholder} className="w-4" />
      </div>
    </div>
);

export default Profile;
