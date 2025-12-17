import React from "react";
import { UseFormRegister } from "react-hook-form";

interface CustomTextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: string;
  icon?: React.ReactNode;
  locale?: string;
  
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  label,
  name,
  placeholder,
  register,
  error,
  icon,
  locale = "en",
}) => {
  const isRTL = locale === "ar";
  
  return (
    <div className="my-5">
      <label className="block text-white mb-2 ">
        {label}
      </label>
      <div className="relative">
        <textarea
          placeholder={placeholder}
          rows={4}
          className={`w-full focus:outline-none focus:border text-md font-medium focus:border-[#CAB16C]  bg-white bg-opacity-10 rounded-lg px-2 py-3 text-white placeholder-white transition-all duration-300 ${
            isRTL ? 'text-right' : 'text-left'
          } ${
            error 
              ? "border border-red-500" 
              : "border border-transparent focus:outline-none focus:border focus:border-[#CAB16C]  "
          }`}
          {...register(name)}
        />
        {icon && (
          <div className={`absolute top-4 flex items-center gap-2 ${
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

export default CustomTextarea;