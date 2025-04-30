import React, { useState } from "react";
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface Props {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const PasswordInput: React.FC<Props> = ({ value, onChange, placeholder = "Password" }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="flex items-center border px-3 py-2 rounded-md">
            <AiOutlineLock className="text-gray-500" />
            <input
                type={visible ? "text" : "password"}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="ml-2 outline-none w-full"
                required
            />
            <div onClick={() => setVisible(!visible)} className="cursor-pointer">
                {visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
        </div>
    );
};

export default PasswordInput;
