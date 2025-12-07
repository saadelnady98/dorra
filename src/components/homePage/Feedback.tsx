"use client";

import React from "react";
import Image from "next/image";
import Container from "@/components/reusableComponent/Container";
import qq from "@/public/qq.svg";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import userImage from "@/public/user.webp";


import { Autoplay, Pagination } from "swiper/modules";
import SectionTitle from "@/components/reusableComponent/SectionTitle";
import { useTranslations } from "next-intl";

function Feedback({ data }: { data: any }) {
  const t = useTranslations("Feedback");



  return (
    <Container>
      <div data-aos="fade-up" data-aos-delay="500">
        <SectionTitle
          title={t("Feedback_title")}
          description={t("Feedback_description")}
        />
        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
          // dir="ltr"
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          //   centeredSlides={true}
          speed={700}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
          
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
          loop
          className="FeedbackSlider w-full lg:min-h-[320px] h-fit xl:min-h-[270px] rounded-[24px] [&_.swiper-pagination-bullet]:bg-white/40 [&_.swiper-pagination-bullet]:!rounded-[7px] [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet-active]:!bg-white [&_.swiper-pagination-bullet-active]:!w-[30px] [&_.swiper-pagination-bullet]:!opacity-100 [&_.swiper-pagination-bullet]:w-[6px] [&_.swiper-pagination-bullet]:!h-[4px] [&_.swiper-pagination]:!bottom-0 [&_.swiper-pagination]:z-20"
        >
          {/* cart */}
          {data?.map((item, index) => (
            <SwiperSlide key={item?.id} className="">
              <div className="relative group">
                {/* Background Rectangle */}
                <div className=" inset-0 bg-white/5 border border-white/20 rounded-[24px] ">
                  {/* Content Container */}
                  <div className="p-4 md:p-6 flex flex-col h-full">
                    {/* Header with Image and Info */}
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                

                      {/* User Info and Rating */}
                      <div className="flex items-center">
                        {/* User Image */}
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl overflow-hidden ltr:mr-3 rtl:ml-3">
                          <Image
                           
                            src={item?.image?.original_url ?? userImage}
                            alt={item?.name || "أحمد العتيبي"}
                            width={200}
                            height={200}
                            loading="eager"
                            quality={75}
                            priority={index < 3}
                            className="object-cover w-full h-full"
                          />
                        </div>

                        <div className="">
                          <h3 className="text-white text-base md:text-base font-medium mb-0.5 md:mb-1">
                            {item?.name}
                          </h3>
                          <p className="text-white text-[10px] md:text-xs font-light">
                            {t("Feedback_visite")}: {item?.date}
                          </p>
                        </div>
                      </div>

                      {/* Left Quote Icon */}
                      <div className="w-[40px] h-[30px] md:w-[53px] md:h-[40px] flex items-center justify-center">
                       
                        <Image
                          src={qq || defaultimg}
                          alt="Shopping Bag"
                          width={20}
                          height={20}
                          unoptimized
                          className="object-contain w-full h-full"
                        />

                     
                      </div>
                    </div>

                    {/* Feedback Text */}
                    <p className="text-white/80 text-sm leading-5 md:leading-6 mb-3 md:mb-4 lg:h-[68px] lg:line-clamp-3">
                      {item?.comment}
                    </p>

                    {/* Rating Stars */}
                    <div className="flex justify-start gap-0.5 md:gap-1">
                      {[1, 2, 3, 4, 5].map((star, index) => (
                        <Icon
                          key={index}
                          icon="line-md:star-filled"
                          className="text-[#CAB16C] text-sm md:text-xl"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
}

export default Feedback;
