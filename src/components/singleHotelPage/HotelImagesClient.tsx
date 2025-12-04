"use client";

import { useState } from "react";
import pic1 from "@/public/card.webp";
import pic2 from "@/public/card.webp";
import pic3 from "@/public/card.webp";
import pic4 from "@/public/card.webp";
import pic5 from "@/public/card.webp";
import location from "@/public/loacation.svg";
import phone from "@/public/phone.svg";
import mail from "@/public/mail.svg";
import Container from "@/components/reusableComponent/Container";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { getTranslations } from "next-intl/server";
// import { FaStar } from "react-icons/fa6";
// import { SlCalender } from "react-icons/sl";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import { IoPeopleOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Import custom Swiper styles
import "./swiperCustomStyles.css";
import ImageSlider from "./ImageSlider";
import HotelImageGrid from "../reusableComponent/HotelImageGrid";
import ImageModal from "../reusableComponent/ImageModal";
import { useTranslations } from "next-intl";

// Client component with interactive elements
const HotelImagesClient = ({ data }: any) => {
  const t = useTranslations("SingleHotelPage");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <Container className="!pt-0">
      <div className="flex flex-col gap-4">
        <span className="text-[20px] lg:text-[32px] font-medium text-white">
          {data?.name}
        </span>
        <div className="flex flex-col flex-wrap lg:flex-row lg:items-center gap-5 lg:gap-8">
          <div className="flex items-center gap-1">
            {/* <span className="text-gold text-[24px]">icon</span> */}
            <Image src={location} alt="location" className="w-5 h-5" />
            <span className="text-white text-[14px] lg:text-[16px] font-light">
              {data?.address}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {/* <span className="text-gold text-[24px]">icon</span> */}
            <Image src={phone} alt="phone" className="w-5 h-5" />
            <span className="text-white text-[14px] lg:text-[16px] font-light">
              {data?.phone}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {/* <span className="text-gold text-[24px]">icon</span> */}
            <Image src={mail} alt="mail" className="w-5 h-5" />
            <span className="text-white text-[14px] lg:text-[16px] font-light">
              {data?.email}
            </span>
          </div>
        </div>
        <div className="flex gap-4 ">
          <span className="text-white text-[14px] lg:text-[16px] font-light">
            {t("rate")} : 5/{Math.round(data?.rating || 0)}
          </span>
          <div className=" flex gap-1 lg:gap-2 items-center">
            {Array.from({ length: Math.round(data?.rating || 0) })?.map(
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

        <HotelImageGrid
          images={data?.images || []}
          openModal={openModal}
          showPhotoText={t("Show50photo")}
          fallbackImages={{
            main: pic1,
            others: pic5,
          }}
          isOriginalUrl={true}
        />
      </div>

      {/* Image Slider Modal */}
      {isModalOpen && (
        <ImageModal images={data?.images || []} onClose={closeModal} />
      )}
    </Container>
  );
};

export default HotelImagesClient;
