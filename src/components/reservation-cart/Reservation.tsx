"use client";

import trash from "@/public/trash.svg";
import Image from "next/image";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import AgeSelect, { SelectTypes } from "../reusableComponent/AgesSelect";
import defaultimg from "@/public/defaultimg.webp";

const options: SelectTypes[] = Array.from({ length: 18 }, (_, i) => ({
  value: i.toString(),
  label: i.toString(),
}));
const Reservation = ({ open, close }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [adultCount, setAdultCount] = useState(2);
  // const [childCount, setChildCount] = useState(1);
  const [ages, setAges] = useState<string[]>(["2", "12"]);

  const toggleDropdown = () => {
    const isVal = ages.includes("0");
    if (isDropdownOpen === true && isVal) {
      setIsError(true);
      return;
    }
    setIsDropdownOpen(!isDropdownOpen);
    setIsError(false);
  };

  const incrementAdult = () => {
    setAdultCount((prev) => prev + 1);
  };

  const decrementAdult = () => {
    setAdultCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const incrementChild = () => {
    const newAges = [...ages, "0"];
    setAges(newAges);
    setIsError(false);
  };

  const decrementChild = () => {
    const newAges = [...ages];
    newAges.pop();
    setAges(newAges);
  };

  // Format the guest display text
  const getGuestText = () => {
    let text = "";

    if (adultCount > 0) {
      text += `${adultCount} بالغين`;
    }

    if (ages.length > 0) {
      if (adultCount > 0) {
        text += " و";
      }

      if (ages.length === 0) {
        text += "طفل";
      } else {
        text += `${ages.length} أطفال`;
      }
    }

    return text || "0 ضيوف";
  };

  const agesHandler = (value: string, index: number) => {
    const newAges = [...ages];
    newAges[index] = value;
    setAges(newAges);
  };
  return (
    <div className="flex flex-col border border-[#ffffff20] bg-white bg-opacity-5 rounded-3xl">
      <div className="flex flex-col md:flex-row p-4 gap-5">
        <Image
          src={trash || defaultimg}
          width={500}
          height={500}
          alt="location"
           className="aspect-[1/1] w-[171px] h-[171px] object-cover rounded-3xl"
        />
        <div className="flex flex-col justify-between gap-4 py-2">
          <div>
            <span className="text-white text-[24px]">
              {"item?.room_type?.name"}
            </span>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-20">
              <div className="flex gap-2">
           
                <Image
                  src={trash || defaultimg}
                  width={50}
                  height={50}
                  alt="location"
                  className="w-5 h-5"
                />
                <span className="text-white text-sm lg:text-base">
                  {"amenity?.name"}
                </span>
              </div>
            </div>
          </div>
          <div>
            <span className="text-[#CAB16C] text-[18px]"> 1,450 ريال</span> /
            الليلة
          </div>
        </div>
      </div>
      <div className="border-t border-[#ffffff20] p-4">
        <div className="relative">
          {/* Guest Count Dropdown Button */}
          <button
            className="flex items-center justify-between w-full bg-black bg-opacity-40 rounded-full p-3 text-white"
            onClick={toggleDropdown}
          >
            <div className="flex items-center gap-2">
              <FaUser className="text-[#CAB16C]" />
              <span>{getGuestText()}</span>
            </div>
            <div className="flex items-center gap-2">
              <IoChevronDown
                className={`transform transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {/* Dropdown Content */}
          {isDropdownOpen && (
            <div className="absolute top-full  left-0 right-0 mt-2 bg-black bg-opacity-90 rounded-2xl p-4 z-10 shadow-lg border border-white">
              <div className="flex flex-col gap-4 relative">
                <div className="flex justify-between items-center rounded-full px-4 py-2">
                  <span className="text-white text-right">عدد البالغين</span>
                  <div className="flex gap-5">
                    <button
                      className="text-white text-xl bg-transparent rounded-full w-6 h-6 flex justify-center items-center border border-white"
                      onClick={incrementAdult}
                    >
                      <span>+</span>
                    </button>
                    <span className="text-white">{adultCount}</span>
                    <button
                      className="text-white text-xl bg-transparent rounded-full w-6 h-6 flex justify-center items-center border border-white"
                      onClick={decrementAdult}
                    >
                      <span>-</span>
                    </button>
                  </div>
                </div>
                <hr className="w-full" />
                <div className="flex justify-between items-center rounded-full px-4 py-2">
                  <span className="text-white text-right">عدد الأطفال</span>
                  <div className="flex gap-5">
                    <button
                      className="text-white text-xl bg-transparent rounded-full w-6 h-6 flex justify-center items-center border border-white"
                      onClick={incrementChild}
                    >
                      <span>+</span>
                    </button>
                    <span className="text-white">{ages.length}</span>
                    <button
                      className="text-white text-xl bg-transparent rounded-full w-6 h-6 flex justify-center items-center border border-white"
                      onClick={decrementChild}
                    >
                      <span>-</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-3">
                {ages?.map((age: any, index: string) => {
                  return (
                    <div key={index} className="col-span-3 w-full">
                      <AgeSelect
                        onChange={agesHandler}
                        error={isError}
                        value={age}
                        index={index}
                        options={options}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Reservation;
