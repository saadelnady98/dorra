import Image from "next/image";
import React from "react";
import title from "@/public/title.svg";
import MainLink from "@/components/reusableComponent/MainLink";
import { getTranslations } from "next-intl/server";
import Container from "@/components/reusableComponent/Container";
import cardFallBackImg from "@/public/card.webp";

const AboutSection = async ({
  data,
  noDetails,
  className,
}: {
  data: any;
  noDetails?: boolean;
  className?: string;
}) => {
  const t = await getTranslations("AboutSection");

  return (
    <Container className={className}>
      <div
        className="relative flex flex-col-reverse lg:flex-row items-center justify-start gap-8 lg:gap-20 max-sm:px-4 bg-primary-950"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        {/* Image */}
        <div className="relative w-full h-[300px] max-sm:max-w-[284px] sm:w-[321px] lg:w-[585px] xl:w-[505px] sm:h-[378px] lg:h-[353px] xl:h-[420px] 2xl:h-[580px] mt-8 lg:mt-0">
          <div className="relative w-full h-full">
            <Image
              src={data?.image?.original_url ?? cardFallBackImg}
              alt="Durra Taiba Hotel"
              fill
              quality={65}
              loading="lazy"
              sizes="
  (max-width: 640px) min(100vw, 284px),
  (max-width: 768px) min(100vw, 321px),
  (max-width: 1024px) min(100vw, 585px),
  (max-width: 1280px) min(100vw, 505px),
  min(100vw, 580px)
"
              className="object-cover rounded-t-[49%]"
            />

            <div className="absolute left-0 bottom-0 h-full w-full rounded-t-[49%] bg-[#CAB16C] opacity-35 -translate-x-2 translate-y-2 -z-10" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col max-w-xl w-full">
          <div className="text-center lg:ltr:text-left lg:rtl:text-right">
            <div className="flex flex-col lg:flex-col-reverse items-center lg:items-start lg:justify-start gap-2 lg:gap-4">
              <div className="w-[42px] lg:w-16 mb-2 lg:mb-0 order-first lg:order-last">
                <Image
                  src={title ?? cardFallBackImg}
                  alt="ornament"
                  width={42}
                  height={9}
                  className="object-cover w-full"
                  unoptimized
                />
              </div>
              <h2 className="text-[#CAB16C] text-sm lg:text-2xl">
                {t("title")}
              </h2>
            </div>
            <h3 className="text-white text-xl lg:text-4xl mt-3 lg:mt-4 px-4 lg:px-0">
              {/* {t("subtitle")} */}
              {data?.title}
            </h3>
            <p className="text-white mt-4 lg:mt-6 leading-relaxed text-base lg:text-lg">
              {/* {t("description")} */}
              {data?.description}
            </p>
          </div>

          {/* Statistics */}
          {!noDetails && (
            <div className="flex justify-between lg:justify-start items-center mt-12 px-5 lg:px-0 lg:gap-12">
              <div className="text-center relative">
                <p className="text-[#CAB16C] text-2xl lg:text-3xl font-bold">
                  {data?.room_count}+
                </p>
                <p className="text-white mt-1 text-sm lg:text-base">
                  {t("rooms")}
                </p>
              </div>
              <div className="w-[0.5px] h-[60px] bg-white opacity-50" />
              <div className="text-center">
                <p className="text-[#CAB16C] text-2xl lg:text-3xl font-bold">
                  {data?.experience_count}+
                </p>
                <p className="text-white mt-1 text-sm lg:text-base">
                  {t("experience")}
                </p>
              </div>
              <div className="w-[0.5px] h-[60px] bg-white opacity-50" />
              <div className="text-center">
                <p className="text-[#CAB16C] text-2xl lg:text-3xl font-bold">
                  {data?.hotel_count}+
                </p>
                <p className="text-white mt-1 text-sm lg:text-base">
                  {t("hotels")}
                </p>
              </div>
            </div>
          )}

          {/* CTA Button */}
          {!noDetails && (
            <div className="mt-8 lg:mt-12 flex justify-center lg:justify-start">
              {/* <button className="bg-white text-primary-400 px-8 py-3 rounded-full text-sm lg:text-base hover:bg-primary-50 transition-colors w-[134px] h-[45px] lg:w-auto lg:h-auto">
                    {t('cta')}
                </button> */}
              <MainLink href="/about-us" styleMe>
                {t("cta")}
              </MainLink>
            </div>
          )}
        </div>

        <div className="rtl:bg-red-500 ltr:bg-green-500"></div>
      </div>
    </Container>
  );
};

export default AboutSection;
