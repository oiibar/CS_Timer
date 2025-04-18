import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";

const SocialButtons: React.FC = () => {
    return (
        <div className="flex justify-center gap-4 mt-2">
            <button
                type="button"
                onClick={() => alert("Google Auth not implemented")}
                className="border p-2 rounded-full hover:bg-gray-100 transition"
            >
                <FaGoogle className="text-red-500" />
            </button>
            <button
                type="button"
                onClick={() => alert("GitHub Auth not implemented")}
                className="border p-2 rounded-full hover:bg-gray-100 transition"
            >
                <FaGithub className="text-black" />
            </button>
        </div>
    );
};

export default SocialButtons;
