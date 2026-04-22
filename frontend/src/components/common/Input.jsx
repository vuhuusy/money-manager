import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({
    label,
    value,
    onChange,
    type,
    placeholder,
    autoComplete,
    isSelect,
    options,
    name,
    error,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="text-sm text-slate-800 block mb-1">{label}</label>
            <div className="relative">
                {type === "date" ? (
                    <input
                        id={name}
                        type="date"
                        name={name}
                        value={value}
                        onChange={(e) => onChange(e)}
                        className={`w-full border rounded-md py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:border-violet-500 ${error ? "border-red-400" : "border-gray-300"}`}
                    />
                ) : isSelect ? (
                    <select
                        id={name}
                        name={name}
                        className={`w-full bg-transparent outline-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-violet-500 ${error ? "border-red-400" : "border-gray-300"}`}
                        value={value}
                        onChange={(e) => onChange(e)}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        id={name}
                        className={`w-full bg-transparent outline-none border rounded-md py-2 px-3 pr-10 text-sm text-gray-700 leading-tight focus:outline-none focus:border-violet-500 ${error ? "border-red-400" : "border-gray-300"}`}
                        type={type === "password" ? (showPassword ? "text" : "password") : type}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        onChange={(e) => onChange(e)}
                    />
                )}

                {type === "password" && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                        {showPassword ? (
                            <Eye size={20} className="text-violet-600" onClick={togglePasswordVisibility} />
                        ) : (
                            <EyeOff size={20} className="text-gray-500" onClick={togglePasswordVisibility} />
                        )}
                    </span>
                )}
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default Input;
