import React from "react";
import Container from "../reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import location from "@/public/loacation.svg";
import MainLink from "../reusableComponent/MainLink";
import defaultimg from "@/public/defaultimg.webp";
const SimilarHotel = async ({ data }: any) => {
  const t = await getTranslations("SimilarHotel");
  return (
    <Container>
      <div className="flex flex-col gap-5">
        <span className="text-white text-[24px] font-medium">{t("title")}</span>

        {/* similar hotels  |  Branches Grid*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
          {data?.map((branch) => (
            <div
              key={branch?.id}
              className="bg-white bg-opacity-5 border border-white border-opacity-20 rounded-2xl md:rounded-3xl p-2 md:p-4 !pb-0 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-[250px] 2xl:h-[300px] mb-4 md:mb-6">
                <Image
                  src={branch?.image?.original_url || defaultimg}
                  alt={"branch"}
                  fill
                  className="object-cover rounded-lg w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="px-1 pb-4 md:pb-6">
                <div>
                  <h3 className="text-white md:text-lg text-base mb-1 md:mb-2 rtl:text-right ltr:text-left line-clamp-1">
                    {branch?.name}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center flex-row gap-2 mb-4 md:mb-6">
                    {/* <FaMapMarkerAlt className="text-primary w-5 h-5 md:w-6 md:h-6" /> */}

                    {/* icon */}
                    <div className="relative min-w-11 w-11 h-6">
                      <Image
                        src={location}
                        alt="Shopping Bag"
                        width={12}
                        height={12}
                        className="object-contain w-full h-full"
                      />
                    </div>

                    <div className="overflow-y-auto flex items-center h-fit hidden-scrollbar">
                      <p className="text-white/80 md:text-sm text-xs ">
                        {branch?.address}
                      </p>
                    </div>
                  </div>
                </div>

                <MainLink
                  href={`/hotels/${branch?.slug}`}
                  className="w-full mt-auto !text-[#CAB16C] bg-[#CAB16C] bg-opacity-15 hover:bg-opacity-25 text-primary rounded-full py-2.5 md:py-3 text-sm md:text-base transition-all text-center"
                >
                  {t("show_details")}
                </MainLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default SimilarHotel;
