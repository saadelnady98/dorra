"use client";

import React from "react";
import Image from "next/image";
import title from "@/public/title.svg";

interface SectionTitleProps {
  title: string;
  description?: string;
  imageUrl?: string;
  className?: string;
}

const SectionTitle = ({
  title: titleText,
  description,
  imageUrl,
  className,
}: SectionTitleProps) => {
  return (
    <div className={`text-center mb-6 md:mb-11 ${className ? className : ""}`}>
      <div className="flex flex-col items-center">
        {/* image an title */}
        <div className="flex flex-col items-center lg:justify-start gap-2 lg:gap-4 mb-3">
          <div className="w-[42px] lg:w-16 mb-2 lg:mb-0">
            <Image
              src={imageUrl || title}
              alt="ornament"
              width={42}
              height={9}
              className="object-cover w-full"
            />
          </div>
          {/* Title */}
          <h2 className="text-[#CAB16C] text-2xl mb-2  capitalize">{titleText ? titleText.split("_").join(" ") : ""}</h2>
        </div>

        {/* description */}
        {description && (
          <p className="description max-w-[725px] text-white text-base md:text-xl description">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SectionTitle;

