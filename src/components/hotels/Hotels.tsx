"use client";
import React, { useEffect, useState } from "react";
import Container from "../reusableComponent/Container";
import CustomSearch from "../reusableComponent/CustomSearch";
import { useForm } from "react-hook-form";
import HotelCard from "./hotelCard/HotelCard";
import { Checkbox } from "../ui/checkbox";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";
import { useTranslations } from "next-intl";
import HotelCardSkeleton from "./hotelCard/HotelCardSkeleton";

const Hotels = ({ locale }: any) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [rating, setRating] = useState<string[]>([]);
  const { register, getValues, watch } = useForm();
  const t = useTranslations("filter");
  const hotelsTranslation = useTranslations("meta.hotels");
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["hotels"],
    queryFn: () =>
      apiServiceCall({
        url: `filter/hotel?${params}${
          getValues("search") && `&search=${getValues("search")}`
        }${rating.length > 0 ? `&rating=${rating.join(",")}` : ""}`,
        method: "GET",
        headers: {
          "Accept-language": locale,
        },
      }),
  });
  useEffect(() => {
    refetch();
  }, [searchParams, watch("search"), rating]);

  // const handleRating = (value: string) => {
  //   const newrating = [...rating];
  //   const index = rating.findIndex((rating) => rating === value);
  //   if (index !== -1) {
  //     newrating.splice(index, 1);
  //     setRating(newrating);
  //   } else {
  //     newrating.push(value );
  //     setRating(newrating);
  //   }
  // };

  const handleRating = (value: string) => {
    setRating((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
    );
  };
  return (
    <Container className="!pt-0">
      <div
        className="flex flex-col w-fll gap-7"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <CustomSearch register={register} />

        <div className="grid grid-col-12 lg:grid-cols-12 gap-6">
          <div className="col-span-12 order-2 lg:order-1 lg:col-span-8 flex flex-col gap-6">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <HotelCardSkeleton key={i} />
              ))
            ) : data?.data?.length > 0 ? (
              data.data.map((hotel: any, idx: number) => (
                <HotelCard key={idx} hotel={hotel} locale={locale} />
              ))
            ) : (
              <div>{hotelsTranslation("No_data")}</div>
            )}

            {/* <HotelCard />
            <HotelCard /> */}
          </div>
          <div className=" col-span-12 lg:col-span-4 order-1 lg:order-2 text-white">
            <div className=" rounded-[24px] px-6 flex flex-col py-7  gap-4 border-[.5px] border-[#FFFFFF33] bg-[#FFFFFF0D]">
              <span className="text-[20px]">{t("filter")}</span>
              <div className="flex flex-col gap-4">
                <span className="text-[18px]">{t("rating")}</span>
                <div className="flex  gap-2 items-center">
                  <Checkbox
                    className="border-[white] h-[20px] w-[20px]"
                    id="terms"
                    onCheckedChange={() => handleRating("1")}
                  />
                  <label htmlFor="1">{t("1star")}</label>
                </div>
                <div className="flex  gap-2 items-center">
                  <Checkbox
                    className="border-[white] h-[20px] w-[20px]"
                    id="terms"
                    onCheckedChange={() => handleRating("2")}
                  />
                  <label htmlFor="1">{t("2star")}</label>
                </div>
                <div className="flex  gap-2 items-center">
                  <Checkbox
                    className="border-[white] h-[20px] w-[20px]"
                    id="terms"
                    onCheckedChange={() => handleRating("3")}
                  />
                  <label htmlFor="1">{t("3star")}</label>
                </div>
                <div className="flex  gap-2 items-center">
                  <Checkbox
                    className="border-[white] h-[20px] w-[20px]"
                    id="terms"
                    onCheckedChange={() => handleRating("4")}
                  />
                  <label htmlFor="1">{t("4star")}</label>
                </div>
                <div className="flex  gap-2 items-center">
                  <Checkbox
                    className="border-[white] h-[20px] w-[20px]"
                    id="terms"
                    onCheckedChange={() => handleRating("5")}
                  />
                  <label htmlFor="1">{t("5star")}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Hotels;
