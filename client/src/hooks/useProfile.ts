import { useEffect, useState } from "react";
import { AuthService } from "@services/auth.service";

export const useProfile = () => {
    const [formFields, setFormFields] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const passwordMismatch = Boolean(
        formFields.password &&
        formFields.confirmPassword &&
        formFields.password !== formFields.confirmPassword
    );

    useEffect(() => {
        AuthService.getProfile().then((user) => {
            if (user) {
                setFormFields((prev) => ({ ...prev, username: user.username }));
            }
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormFields((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordMismatch) return;

        try {
            const payload: { username: string; password?: string } = {
                username: formFields.username,
            };

            if (formFields.password) {
                payload.password = formFields.password;
            }

            const updatedUser = await AuthService.updateProfile(payload);
            if (updatedUser) {
                alert("Profile updated successfully");
                setFormFields((prev) => ({ ...prev, password: "", confirmPassword: "" }));
            }
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update profile");
        }
    };

    return {
        formFields,
        showPassword,
        showConfirmPassword,
        passwordMismatch,
        setShowPassword,
        setShowConfirmPassword,
        handleChange,
        handleSubmit,
    };
};
