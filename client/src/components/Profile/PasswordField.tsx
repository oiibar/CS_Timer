import unlockedIcon from "@assets/auth/unlocked.svg";
import passwordIcon from "@assets/auth/password.svg";
import openIcon from "@assets/auth/open.svg";
import closedIcon from "@assets/auth/closed.svg";

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

export default PasswordField