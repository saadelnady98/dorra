import Image from "next/image";
import React from "react";
import defaultimg from "@/public/defaultimg.webp";
import { useLocale } from "next-intl";
interface HotelImageGridProps {
  cardStyle?: boolean;
  images: any[];
  openModal?: () => void;
  showPhotoText: string;
  fallbackImages: {
    main: any
    others: any;
  };
  isOriginalUrl?: boolean;
}

const HotelImageGrid = ({
  cardStyle,
  images,
  openModal,
  showPhotoText,
  fallbackImages,
  isOriginalUrl = false,
}: HotelImageGridProps) => {
  const locale = useLocale();
  const getImageSrc = (image: any, fallback: string) => {
    if (isOriginalUrl) {
      return image?.original_url || fallback;
    }
    return image || fallback;
  };

  return (
    <div
      className="h-full overflow-hidden"
      dir={locale === "ar" ? "ltr" : "rtl"}
    >
      {/* --------------- hidden for mobile | visible for desktop --------------- */}
      <div
        className={`hidden lg:grid grid-cols-2 gap-2 rounded-[24px] overflow-hidden ${cardStyle ? "h-full" : "min-h-[470px]"
          }`}
      >
        <div className="grid grid-cols-2 gap-2 h-full overflow-hidden">
          {images?.slice(1, 5)?.map((image, index) => {
            if (index === 3) {
              return (
                <div className="relative order-3 overflow-hidden" key={index}>
                  <Image
                    src={getImageSrc(image, fallbackImages.others)}
                    width={500}
                    height={500}
                    alt="hotel image"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer"
                    onClick={openModal}
                  >
                    <span className="text-white underline underline-offset-1 ">
                      {showPhotoText}
                    </span>
                  </div>
                </div>
              );
            }
            return (
              <div
                className={`relative ${index + 1 === 3 ? `order-4` : "order-1"
                  } overflow-hidden`}
                key={index}
              >
                <Image
                  key={index}
                  className={`w-full h-full object-cover`}
                  src={getImageSrc(image, fallbackImages.others)}
                  width={500}
                  height={500}
                  alt="hotel"
                />
              </div>
            );
          })}
        </div>

        <div className="h-full overflow-hidden">
          <Image
            src={getImageSrc(images?.[0], fallbackImages.main)}
            width={500}
            height={500}
            alt="image hotel"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* --------------- hidden for desktop | visible for mobile --------------- */}
      <div className="relative rounded-[24px] overflow-hidden lg:hidden max-h-[350px] md:max-h-[450px]">
        <Image
          src={getImageSrc(images?.[0], fallbackImages.main)}
          alt="hotel image"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <span
            className="absolute bottom-[30px] left-[30px] underline underline-offset-1 bg-white text-black rounded-xl px-2 py-2 cursor-pointer"
            onClick={openModal}
          >
            {showPhotoText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HotelImageGrid;
