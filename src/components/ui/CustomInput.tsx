import React from "react";
import { UseFormRegister } from "react-hook-form";

interface CustomInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: string;
  icon?: React.ReactNode;
  locale?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  icon,
  locale = "en",
}) => {
  const isRTL = locale === "ar";
  
  return (
    <div className="mb-5">
      <label className="block text-white mb-2 text-md font-medium">{label}</label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full bg-white focus:outline-none  focus:border focus:border-[#CAB16C] bg-opacity-10 rounded-lg px-2 py-3 text-white placeholder-white transition-all duration-300 ${
            isRTL ? 'text-right' : 'text-left'
          } ${
            error 
              ? "border border-red-500" 
              : "border border-transparent focus:outline-none focus:border focus:border-[#CAB16C] "
          }`}
          {...register(name)}
        />
        {icon && (
          <div className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-2 ${
            isRTL ? 'left-4' : 'right-4'
          }`}>
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className={`text-red-500 text-sm mt-1  `}>
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomInput;