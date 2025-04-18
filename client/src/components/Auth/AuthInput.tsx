import React from "react";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";

interface Props {
    type: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    icon: "email" | "user";
}

const AuthInput: React.FC<Props> = ({ type, placeholder, value, onChange, icon }) => {
    const renderIcon = () => {
        switch (icon) {
            case "email":
                return <AiOutlineMail className="text-gray-500" />;
            case "user":
                return <AiOutlineUser className="text-gray-500" />;
            default:
                return null;
        }
    };

    return (
        <div className="flex items-center border px-3 py-2 rounded-md">
            {renderIcon()}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="ml-2 outline-none w-full"
                required
            />
        </div>
    );
};

export default AuthInput;
