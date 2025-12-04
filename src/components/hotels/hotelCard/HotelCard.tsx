"use client";
import Image from "next/image";
import React from "react";
import CustomButton from "@/components/reusableComponent/CustomButton";
import defaultimg from "@/public/defaultimg.png";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

const HotelCard = ({ hotel, locale }: { hotel: any; locale: string }) => {
  const router = useRouter();
  const handleViewDetails = () => {
    router.push(`/${locale}/hotels/${hotel?.slug}`);
  };
  return (
    <div
      className=" rounded-[24px] text-white px-6 grid grid-cols-12 py-7  gap-6 border-[.5px] border-[#FFFFFF33] bg-[#FFFFFF0D]"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="flex col-span-12 lg:col-span-4">
        <Image
          src={hotel?.image?.original_url || defaultimg}
          width={272}
          height={280}
          alt="hotel image"
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-4 col-span-12 lg:col-span-8">
        <h5 className="text-[24px] font-medium "> {hotel?.name} </h5>
        <div className="flex gap-1 items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.24231 18.4898L9.24244 18.4899L9.26855 18.5198C10.0506 19.4144 10.8711 20.353 11.6042 21.3049M9.24231 18.4898L11.6042 21.3049M9.24231 18.4898C7.98465 17.0522 6.79648 15.6918 5.91792 14.2915C5.04345 12.8977 4.50007 11.5009 4.5 10.0003C4.50231 8.01179 5.29325 6.10541 6.69933 4.69933C8.10534 3.29332 10.0116 2.50238 12 2.5C13.9884 2.50238 15.8947 3.29332 17.3007 4.69933C18.7068 6.10547 19.4978 8.01197 19.5 10.0006C19.4999 11.5011 18.9565 12.8978 18.0821 14.2915C17.2035 15.6918 16.0154 17.0522 14.7577 18.4898L14.7576 18.4899L14.7314 18.5198C13.9494 19.4144 13.129 20.3529 12.396 21.3047M9.24231 18.4898L12.396 21.3047M11.6042 21.3049C11.6508 21.3654 11.7108 21.4144 11.7794 21.4482C11.848 21.4819 11.9235 21.4995 12 21.4995C12.0765 21.4995 12.152 21.4819 12.2206 21.4482C12.2893 21.4144 12.3493 21.3653 12.396 21.3047M11.6042 21.3049L12.396 21.3047M10.0555 12.9101C10.6311 13.2947 11.3078 13.5 12 13.5C12.9283 13.5 13.8185 13.1313 14.4749 12.4749C15.1313 11.8185 15.5 10.9283 15.5 10C15.5 9.30777 15.2947 8.63108 14.9101 8.0555C14.5256 7.47993 13.9789 7.03133 13.3394 6.76642C12.6999 6.50152 11.9961 6.4322 11.3172 6.56725C10.6383 6.7023 10.0146 7.03564 9.52513 7.52513C9.03564 8.01461 8.7023 8.63825 8.56725 9.31718C8.4322 9.99612 8.50151 10.6999 8.76642 11.3394C9.03133 11.9789 9.47993 12.5256 10.0555 12.9101Z"
              stroke="#CAB16C"
            />
          </svg>

          <span className="text-[16px] font-[300]"> {hotel?.address}</span>
        </div>
        <div className="flex gap-3">
          {" "}
          <span>{locale === "ar" ? "التقييم" : "Rating"} :{hotel?.rating}</span>
          {/* <Ratings rating={hotel?.rating} variant="yellow" totalStars={5} /> */}
          <div className=" flex gap-1 lg:gap-2 items-center">
            {Array.from({ length: Math.round(hotel?.rating || 0) })?.map(
              (_, index) => (
                // <FaStar key={index} className="text-gold" />
                //   <Image src={star} alt="phone" className="w-5 h-5" />
                <Icon
                  key={index}
                  icon="line-md:star-filled"
                  className="text-[#CAB16C] text-xl"
                />
              )
            )}
          </div>
        </div>
        <p>{hotel?.description}</p>
        <div className="flex justify-end mt-[20px] ">
          <button
            onClick={() => {
              handleViewDetails();
            }}
            className="bg-[#CAB16C26] text-[#CAB16C] font-medium w-fit  text-center px-[50px] py-3 rounded-full hover:bg-[#CAB16C] hover:text-white transition-all duration-300"
          >
          {locale === "ar" ? "عرض التفاصيل" : "View Details"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
