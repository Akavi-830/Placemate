import React from "react";

const AuthInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-2 text-sm font-medium">
        {label}
      </label>

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default AuthInput;
