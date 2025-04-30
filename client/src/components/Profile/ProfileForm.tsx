import PasswordField from "./PasswordField";
import userIcon from "@assets/auth/user.svg";

interface ProfileFormProps {
    formFields: {
        username: string;
        password: string;
        confirmPassword: string;
    };
    showPassword: boolean;
    showConfirmPassword: boolean;
    passwordMismatch: boolean;
    setShowPassword: (val: boolean) => void;
    setShowConfirmPassword: (val: boolean) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const ProfileForm = ({
                         formFields,
                         showPassword,
                         showConfirmPassword,
                         passwordMismatch,
                         setShowPassword,
                         setShowConfirmPassword,
                         handleChange,
                         handleSubmit,
                     }: ProfileFormProps) => (
    <form className="space-y-4" onSubmit={handleSubmit}>
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
);

export default ProfileForm;
