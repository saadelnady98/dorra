"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import MainLink from "@/components/reusableComponent/MainLink";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Container from "@/components/reusableComponent/Container";
import card from "@/public/card.webp";

function HomeSlider({ data, imagesOnly }: { data: any; imagesOnly?: boolean }) {
  const t = useTranslations("home");

  if (!data?.images || data.images.length === 0) return null;

  const firstImage = data.images[0];
  const otherImages = data.images.slice(1);

  return (
    <Container className="!pt-0">
      <div
        className="relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[550px] rounded-[32px] overflow-hidden"
      >
        <Image
          src={firstImage.original_url ?? card}
          alt="Luxury Hotel"
          fill
          className="object-cover object-center"
          priority
          fetchPriority="high"
          loading="eager"
          quality={75}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
        />
        <div className="absolute inset-0 bg-black/30"></div>

        <Swiper
          spaceBetween={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          dir="ltr"
          modules={[Autoplay, Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
          centeredSlides={true}
          speed={700}
          loop
          className="HomeSlider dir-ltr w-full h-full rounded-[24px] [&_.swiper-pagination-bullet]:bg-white/40 [&_.swiper-pagination-bullet]:!rounded-[7px] [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet-active]:!bg-white [&_.swiper-pagination-bullet-active]:!w-[30px] [&_.swiper-pagination-bullet]:!opacity-100 [&_.swiper-pagination-bullet]:w-[6px] [&_.swiper-pagination-bullet]:!h-[4px] [&_.swiper-pagination]:!bottom-0 [&_.swiper-pagination]:z-20"
        >
          {otherImages.map((image: { id: React.Key | null | undefined; original_url: any; }, index: any) => (
            <SwiperSlide key={image.id}>
              <div className="relative w-full h-[300px] md:h-full">
                <Image
                  src={image.original_url ?? card}
                  alt="Luxury Hotel"
                  fill
                  className="object-cover object-center"
                  quality={75}
                  loading="lazy"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
            </SwiperSlide>
          ))}

          {/* المحتوى */}
          {!imagesOnly && (
            <div className="absolute top-0 z-10 w-full h-full flex flex-col items-center justify-center text-center text-white px-4 bg-black/30">
              <div className="max-w-[714px] space-y-4">
                <h1
                  className="text-[18px] leading-[27px] font-medium md:text-[48px] md:leading-[72px] md:font-semibold"
                >
                  {data?.text || t("hero.title")}
                </h1>
                <p
                  className="text-[11px] leading-[16.5px] max-w-[330px] md:text-[20px] md:leading-[30px] md:max-w-[530px] mx-auto"
                >
                  {data?.description || t("hero.description")}
                </p>
                <div
                  className="flex justify-center pt-5"
                >
                  <MainLink href="/hotels" styleMe>
                    {t("hero.bookNow")}
                  </MainLink>
                </div>
              </div>
            </div>
          )}
          <button
            data-aos="fade-right"
            data-aos-delay="600"
            className="absolute top-1/2 -translate-y-1/2 !left-5 z-10 swiper-button-prev [&]:!hidden [&]:sm:!flex [&]:after:hidden !w-10 !h-10 rounded-full !bg-[#fff]/25 items-center justify-center hover:!bg-[#121212a1] transition-colors"
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
          </button>
          <button
            data-aos="fade-left"
            data-aos-delay="600"
            className="absolute top-1/2 -translate-y-1/2 !right-5 z-10 swiper-button-next [&]:!hidden [&]:sm:!flex [&]:after:hidden !w-10 !h-10 rounded-full !bg-[#fff]/25 items-center justify-center hover:!bg-[#121212a1] transition-colors"
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
        </Swiper >
      </div >
    </Container >
  );
}

export default HomeSlider;