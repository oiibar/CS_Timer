import { useState, useEffect } from "react";
import { AuthService } from "@services/auth.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import SocialButtons from "./SocialButtons";

type Props = {
    isLogin: boolean;
    toggleMode: () => void;
};

const AuthForm: React.FC<Props> = ({ isLogin, toggleMode }) => {
    const [form, setForm] = useState({ email: "", password: "", username: "", confirmPassword: "" });
    const [mismatch, setMismatch] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setMismatch(form.password !== form.confirmPassword);
    }, [form.password, form.confirmPassword]);

    const handleChange = (key: string, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await AuthService.login({ email: form.email, password: form.password });
                toast.success("Logged in!");
                navigate("/");
            } else {
                await AuthService.signUp({ email: form.email, password: form.password, username: form.username });
                toast.success("Registered!");
                navigate("/login");
            }
            toast.success(isLogin ? "Logged in!" : "Registered!");
            navigate(isLogin ? "/" : "/login");
        } catch (err: any) {
            toast.error(err.response?.data.message || "Something went wrong");
        }
    };

    return (
        <div className="shadow-md p-10 bg-white rounded-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-1">{isLogin ? "Welcome back" : "Join to Quiz Deck"}</h2>
            <p className="text-sm text-gray-500 mb-4">{isLogin ? "Login to continue" : "Create an account"}</p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <AuthInput
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(val) => handleChange("email", val)}
                    icon="email"
                />
                {!isLogin && (
                    <AuthInput
                        type="text"
                        placeholder="Username"
                        value={form.username}
                        onChange={(val) => handleChange("username", val)}
                        icon="user"
                    />
                )}
                <PasswordInput
                    value={form.password}
                    onChange={(val) => handleChange("password", val)}
                    placeholder="Password"
                />
                {!isLogin && (
                    <PasswordInput
                        value={form.confirmPassword}
                        onChange={(val) => handleChange("confirmPassword", val)}
                        placeholder="Confirm Password"
                    />
                )}
                {!isLogin && mismatch && <p className="text-xs text-red-500">Passwords do not match</p>}

                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-md py-2"
                    disabled={!form.email || !form.password || (!isLogin && mismatch)}
                >
                    {isLogin ? "Login" : "Sign Up"}
                </button>
            </form>

            <p className="text-xs text-gray-500 my-4 text-center">or continue with</p>
            <SocialButtons />

            <p className="text-sm mt-4">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <span onClick={toggleMode} className="text-blue-500 font-bold ml-1 cursor-pointer">
          {isLogin ? "Sign up" : "Log in"}
        </span>
            </p>
        </div>
    );
};

export default AuthForm;
