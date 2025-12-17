"use client";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import React, { useState } from "react";
import Container from "./Container";

// SVG for Minus icon
const minusSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
  </svg>
);

// SVG for Plus icon
const plusSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
  </svg>
);

const headers = {
  names: "FAQs",
};

const banners = {
  name: "FAQs",
  heading: "FAQs",
};

function FaqsHotel({
  data,
  hiddenTitle,
}: {
  data: any;
  hiddenTitle?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prevState) => (prevState === index ? null : index));
  };
  const t = useTranslations("FaqsHotel");

  return (
    <Container>
      <div className="flex flex-col gap-5">
        {!hiddenTitle && (
          <span className="text-white text-[24px] font-medium">
            {t("title")}
          </span>
        )}
        <div className="text-white text-[20px] font-normal ">
          {data?.content}
        </div>
      </div>

      <div>
        {data?.map((item: any, index: number) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay={index * 100}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className={`py-4 text-[14px] lg:text-[24px] font-light w-full flex justify-between items-center  text-white ${
                index === data?.length - 1 ? "" : "border-b border-white/30"
              }`}
            >
              <span>{item?.question}</span>
              <span className="text-[#CAB16C] transition-transform duration-300">
                {activeIndex === index ? minusSVG : plusSVG}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out text-white  ${
                activeIndex === index
                  ? "max-h-96 py-5 border-b border-white/30"
                  : "max-h-0"
              }`}
            >
              <div className="pb-5 text-[20px] font-extralight text-white">
                {item?.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default FaqsHotel;
