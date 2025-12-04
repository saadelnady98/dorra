"use client";

import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import AgeSelect, { SelectTypes } from "../reusableComponent/AgesSelect";
import users from "@/public/users.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

const options: SelectTypes[] = Array.from({ length: 18 }, (_, i) => ({
  value: i.toString(),
  label: i.toString(),
}));

interface GuestsProps {
  watch: any;
  setValue: any;
  getValues: any;
}

const Guests = ({ watch, setValue, getValues }: GuestsProps) => {
  const t = useTranslations("filter");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    // تحقق من وجود أعمار صفرية عند الفتح
    const hasZeroAge = getValues("ages").includes("0");
    setIsError(hasZeroAge);
  };

  const incrementAdult = () => {
    const adults = +getValues("adults");
    if (adults < 17) setValue("adults", adults + 1);
  };

  const decrementAdult = () => {
    const adults = +getValues("adults");
    if (adults > 0) setValue("adults", adults - 1);
  };

  const incrementChild = () => {
    const currentAges = getValues("ages") || [];
    setValue("ages", [...currentAges, "0"]);
    setIsError(true); // لأن العمر الجديد 0
  };

  const decrementChild = () => {
    const currentAges = getValues("ages") || [];
    currentAges.pop();
    setValue("ages", currentAges);
    setIsError(false);
  };

  const agesHandler = (value: string, index: number) => {
    const currentAges = getValues("ages") || [];
    currentAges[index] = value;
    setValue("ages", currentAges);
    const hasZeroAge = currentAges.includes("0");
    setIsError(hasZeroAge);
  };

  const getGuestText = () => {
    const adults = watch("adults") || 0;
    const childrenCount = (watch("ages") || []).length;

    if (adults > 0 && childrenCount > 0) {
      return `${adults} ${t("adults")} ${t("and")} ${childrenCount} ${t("children")}`;
    } else if (adults > 0) return `${adults} ${t("adults")}`;
    else if (childrenCount > 0) return `${childrenCount} ${t("children")}`;
    return `0 ${t("guests")}`;
  };

  const hasGuests = (watch("adults") || 0) > 0 || (watch("ages") || []).length > 0;

  return (
    <div className="relative">
      {/* Guest Dropdown Button */}
      <button
        className={`flex items-center px-4 py-[18px] justify-between w-full rounded-[12px] transition-colors duration-300 ${
          hasGuests
            ? "text-[#CAB16C] bg-white hover:bg-white hover:text-[#CAB16C]"
            : "text-white bg-[#FFFFFF1A] hover:bg-white hover:text-[#CAB16C]"
        }`}
        onClick={toggleDropdown}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Image src={users} alt="users" className="w-5 h-5 flex-shrink-0" />
          <span className="text-left truncate">{getGuestText()}</span>
        </div>
        <IoChevronDown
          className={`transform transition-transform duration-300 ${
            isDropdownOpen ? "rotate-180" : ""
          } ${hasGuests ? "text-[#CAB16C]" : "text-[#CAB16C]"}`}
        />
      </button>

      {/* Dropdown Content */}
      {isDropdownOpen && (
        <div className="absolute top-full mt-4 w-full left-0 right-0 bg-[#00000096] backdrop-blur-sm p-4 rounded-[7px] z-10 shadow-lg border border-white">
          <div className="flex flex-col gap-4">
            {/* Adults Counter */}
            <Counter
              label={t("adults")}
              value={watch("adults") || 0}
              onIncrement={incrementAdult}
              onDecrement={decrementAdult}
              min={0}
              max={17}
            />

            <hr className="border-white/20" />

            {/* Children Counter */}
            <Counter
              label={t("children")}
              value={(watch("ages") || []).length}
              onIncrement={incrementChild}
              onDecrement={decrementChild}
              min={0}
              max={17}
            />
          </div>

          {/* Children Ages */}
          {(watch("ages") || []).length > 0 && (
            <div className="mt-4">
              <h4 className="text-white text-sm font-medium mb-3">{t("children_ages")}</h4>
              <div className="grid grid-cols-3 gap-3">
                {getValues("ages").map((age: any, index: number) => (
                  <AgeSelect
                    key={index}
                    index={index}
                    value={age}
                    onChange={agesHandler}
                    options={options}
                    error={isError}
                  />
                ))}
              </div>
              {isError && (
                <p className="text-red-400 text-xs mt-2">{t("please_select_all_ages")}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface CounterProps {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min: number;
  max: number;
}

const Counter = ({ label, value, onIncrement, onDecrement, min, max }: CounterProps) => (
  <div className="flex justify-between items-center px-4 py-2">
    <span className="text-white text-sm font-medium">{label}</span>
    <div className="flex items-center gap-4">
      <button
        className="text-white text-lg bg-transparent rounded-full w-7 h-7 flex justify-center items-center border border-white hover:bg-white hover:text-[#CAB16C] transition-colors duration-200 disabled:opacity-50"
        onClick={onDecrement}
        disabled={value <= min}
      >
        -
      </button>
      <span className="text-white min-w-8 text-center font-medium">{value}</span>
      <button
        className="text-white text-lg bg-transparent rounded-full w-7 h-7 flex justify-center items-center border border-white hover:bg-white hover:text-[#CAB16C] transition-colors duration-200 disabled:opacity-50"
        onClick={onIncrement}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  </div>
);

export default Guests;
