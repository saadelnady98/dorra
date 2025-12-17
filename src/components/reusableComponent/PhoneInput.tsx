// @ts-nocheck
"use client";
import "react-phone-number-input/style.css";
import { useState } from "react";
import dynamic from "next/dynamic";

const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
});

interface Iprops {
  label?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  locale?: string;
  errMessage?: string;
}

const CostumPhoneInput = ({
  label,
  className,
  value,
  onChange,
  errMessage,
  locale = "en",
}: Iprops) => {
  const [isFocused, setIsFocused] = useState(false);
  const isRTL = locale === "ar";

  const handleChange = (val) => {
    if (onChange) onChange(val);
  };

  return (
    <div className={`${className ? className : ""}`}>
      {label && (
        <label className="mt-2 text-white text-md font-medium">{label}</label>
      )}
      {label && <div className="mb-2" />}

      <div
        className={`phone-input-wrapper border border-transparent rounded-lg transition-all duration-300 ${
          isFocused
            ? "!border-[#CAB16C] !ring-2 !ring-[#CAB16C] !ring-opacity-20"
            : ""
        }`}
      >
        <PhoneInput
          defaultCountry="SA"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          className={`w-full  
  [&>input]:outline-none 
  [&>input]:border-none 
  [&>input]:focus:outline-none 
  [&>input]:focus:border-none 
  [&>input]:focus:ring-0 
  [&>input]:bg-white 
  [&>input]:px-2 
  [&>input]:py-3 
  [&>input]:bg-opacity-10 
  
  bg-black bg-opacity-10 
  
  marker:
  [&>input]:p-4 
  [&>input]:md:p-3 

   rtl:[&>input]:rounded-l-lg 
   rtl:[&>input]:rounded-r-none 

   ltr:[&>input]:rounded-r-lg 

   ltr:[&_.PhoneInputCountry]:!rounded-l-lg 
  rtl:[&_.PhoneInputCountry]:!rounded-r-lg 

  [&_.PhoneInputCountry]:!mx-0 
  [&_.PhoneInputCountry]:!px-2 
  [&_.PhoneInputCountry]:!bg-white 
  [&_.PhoneInputCountry]:!bg-opacity-10 
  [&_.PhoneInputCountrySelectArrow]:!hidden 
  [&>.PhoneInputCountry]:mx-2 
  [&_.PhoneInputCountrySelect]:bg-black 

  text-white
`}
          onBlur={() => setIsFocused(false)}
          international
          dir="ltr"
        />
      </div>

      {errMessage && <p className="text-red-500 text-sm mt-1">{errMessage}</p>}
    </div>
  );
};

export default CostumPhoneInput;
