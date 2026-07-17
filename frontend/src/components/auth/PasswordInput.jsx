import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-2 text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 outline-none focus:border-blue-500"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
