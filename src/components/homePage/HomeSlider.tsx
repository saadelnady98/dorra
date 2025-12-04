"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import MainLink from "@/components/reusableComponent/MainLink";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Container from "@/components/reusableComponent/Container";
import card from "@/public/card.webp";

function HomeSlider({ data, imagesOnly }: { data: any; imagesOnly?: boolean }) {
  const t = useTranslations("home");

  return (
    <Container className="!pt-0">
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[550px] rounded-[32px] overflow-hidden"
      >
        <Swiper
          spaceBetween={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          dir="ltr"
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation, Autoplay, Pagination]}
          pagination={{ clickable: true }}
          centeredSlides={true}
          speed={700}
          loop
          className="HomeSlider dir-ltr w-full h-full rounded-[24px] [&_.swiper-pagination-bullet]:bg-white/40 [&_.swiper-pagination-bullet]:!rounded-[7px] [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet-active]:!bg-white [&_.swiper-pagination-bullet-active]:!w-[30px] [&_.swiper-pagination-bullet]:!opacity-100 [&_.swiper-pagination-bullet]:w-[6px] [&_.swiper-pagination-bullet]:!h-[4px] [&_.swiper-pagination]:!bottom-0 [&_.swiper-pagination]:z-20"
        >
          {data?.images?.map((image, index) => {
            return (
              <SwiperSlide key={image?.id} className="">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 ">
                  <Image
                    src={image?.original_url ?? card}
                    alt="Luxury Hotel"
                    width={1024}
                    height={1080}
                    className="object-cover w-full h-full dir-ltr"
                    priority={index === 0}
                    quality={75}
                    loading="eager"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
                {/* <Image fill priority src={file?.original_url} alt={file?.file_name} className="object-cover " /> */}
              </SwiperSlide>
            );
          })}
          {/* Content */}
          {!imagesOnly && (
            <div className="absolute top-0 z-10 w-full h-full flex flex-col items-center justify-center text-center text-white px-4 bg-black/30">
              <div className="max-w-[714px] space-y-4">
                <h1
                  data-aos="fade-down"
                  data-aos-delay="300"
                  className="text-[18px] leading-[27px] font-medium md:text-[48px] md:leading-[72px] md:font-semibold"
                >
                  {data?.text || t("hero.title")}
                </h1>
                <p
                  data-aos="fade-up"
                  data-aos-delay="500"
                  className="text-[11px] leading-[16.5px] max-w-[330px] md:text-[20px] md:leading-[30px] md:max-w-[530px] mx-auto"
                >
                  {data?.description || t("hero.description")}
                </p>
                <div
                  data-aos="zoom-in"
                  data-aos-delay="700"
                  className="flex justify-center pt-5"
                >
                  <MainLink href="/hotels" styleMe>
                    {t("hero.bookNow")}
                  </MainLink>
                </div>
              </div>
            </div>
          )}
          {/* arrows */}
          <button
            data-aos="fade-right"
            data-aos-delay="900"
            className="absolute top-1/2 -translate-y-1/2 !left-5 z-10 swiper-button-prev [&]:!hidden [&]:sm:!flex  [&]:after:hidden !w-10 !h-10 rounded-full !bg-[#fff]/25 items-center justify-center hover:!bg-[#121212a1] transition-colors"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="!w-6 !h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>{" "}
          <button
            data-aos="fade-left"
            data-aos-delay="900"
            className="absolute top-1/2 -translate-y-1/2 !right-5 z-10 swiper-button-next [&]:!hidden [&]:sm:!flex  [&]:after:hidden !w-10 !h-10 rounded-full !bg-[#fff]/25 items-center justify-center hover:!bg-[#121212a1] transition-colors"
          >
            <span className="sr-only">Next</span>
            <svg
              className="!w-6 !h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </Swiper>
      </div>
    </Container>
  );
}

export default HomeSlider;
