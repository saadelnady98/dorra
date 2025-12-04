import React from "react";
import Container from "../reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import location from "@/public/loacation.svg";

const LocationHotel = async ({ data }: any) => {
  const t = await getTranslations("LocationHotel");
  return (
    <Container>
      <div className="flex flex-col gap-5">
        <span className="text-white text-[24px] font-medium">
          {t("location")}
        </span>
        <div className="text-white text-[20px] font-normal ">
          <div className="flex items-center gap-1">
            {/* <span className="text-gold text-[24px]">icon</span> */}
            <Image src={location} alt="location" className="w-5 h-5" />
            <span className="text-white text-[14px] lg:text-[20px]">
              {data?.address}
            </span>
          </div>
        </div>

        <div className="w-full h-[300px] lg:h-[400px] rounded-lg overflow-hidden">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${data?.longitude}!3d${data?.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzUuOSJF!5e0!3m2!1sar!2seg!4v1709465154599!5m2!1sar!2seg`}
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                className="grayscale"
              />
            </div>
      </div>
    </Container>
  );
};

export default LocationHotel;
