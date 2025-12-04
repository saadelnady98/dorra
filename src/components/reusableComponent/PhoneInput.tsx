// @ts-nocheck
"use client";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface Iprops {
  label?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  locale?: string;
}

const CostumPhoneInput = ({
  label,
  className,
  value,
  onChange,
  locale = "en",
}: Iprops) => {
  const t = useTranslations("ContactUsSection");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const isRTL = locale === "ar";

  const handleChange = (value) => {
    onChange(value);

    if (value && !isValidPhoneNumber(value)) {
      setError(t("invalid_phone"));
    } else {
      setError("");
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
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
          className={`w-full  [&>input]:outline-none [&>input]:border-none [&>input]:focus:outline-none [&>input]:focus:border-none [&>input]:focus:ring-0 [&>input]:bg-white [&>input]:px-2 [&>input]:py-3 [&>input]:bg-opacity-10 bg-black bg-opacity-10 ltr:[&>input]:rounded-r-lg rtl:[&>input]:rounded-l-lg rounded-lg [&>input]:p-4 [&>input]:md:p-3 ltr:[&_.PhoneInputCountry]:!rounded-l-lg rtl:[&_.PhoneInputCountry]:!rounded-r-lg [&_.PhoneInputCountry]:!mx-0 [&_.PhoneInputCountry]:!px-2 [&_.PhoneInputCountry]:!bg-white [&_.PhoneInputCountry]:!bg-opacity-10 [&_.PhoneInputCountrySelectArrow]:!hidden [&>.PhoneInputCountry]:mx-2 [&_.PhoneInputCountrySelect]:bg-black text-white  ${
            isRTL ? "[&>input]:text-right" : "[&>input]:text-left"
          }`}
          defaultCountry="SA"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          international
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CostumPhoneInput;
