"use client";
import React, { useEffect, useState } from "react";
import FilterWrrapper from "./FilterWrrapper";
import CustomSelect from "@/components/reusableComponent/CustomSelect";
import { useForm } from "react-hook-form";
import { DatePickerWithRange } from "@/components/reusableComponent/RangeDatepiker";
import Guests from "@/components/reusableComponent/Gustes";
import { formatDate, parseCheckInOutDates } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";

interface HomeFilterProps {
  locale: string;
  hotels: any;
  fixedHotelId?: string | number;
  filterMode?: "hotels" | "rooms";
  onFilterAction?: (params: Record<string, string>) => void;
}

interface FormValues {
  date: any;
  hotel_id: string;
  adults: number;
  ages: string[];
  roomtype_id: string;
}

const HomeFilter = ({
  locale,
  hotels,
  fixedHotelId,
  filterMode = "hotels",
  onFilterAction,
}: HomeFilterProps) => {
  const t = useTranslations("filter");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [hotelsOptions, setHotelsOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { control, getValues, setValue, handleSubmit, watch, reset } = useForm<FormValues>({
    defaultValues: {
      date: null,
      hotel_id: fixedHotelId ? String(fixedHotelId) : "",
      adults: 0,
      ages: [],
      roomtype_id: "",
    },
  });

  const selectedHotelId = watch("hotel_id") || fixedHotelId;

  // Fetch room types
  const { data: roomTypesData, isLoading: isRoomTypesLoading } = useQuery({
    queryKey: ["roomTypes", selectedHotelId],
    queryFn: async () => {
      return apiServiceCall({
        url: `filter/roomtype/${selectedHotelId}`,
        method: "GET",
        headers: {
          "Accept-language": locale,
        },
      });
    },
    enabled: filterMode === "rooms" && !!selectedHotelId,
  });

  // Prepare options
  const roomTypeOptions =
    roomTypesData?.data?.map((roomType: any) => ({
      value: String(roomType.id),
      label: roomType.name,
    })) || [];

  const handleSearchParams = (data: FormValues) => {
    setIsLoading(true);

    const params: Record<string, string> = {};

    // Adults
    if (data.adults && data.adults !== 0) {
      params.adults = String(data.adults);
    }

    // Hotel ID
    if (fixedHotelId) {
      params.hotel_id = String(fixedHotelId);
    } else if (data.hotel_id) {
      params.hotel_id = data.hotel_id;
    }

    // Dates
    if (data.date && data.date.from && data.date.to) {
      params.checkin_date = formatDate(data.date.from);
      params.checkout_date = formatDate(data.date.to);
    }

    // Ages
    if (data.ages && data.ages.length > 0) {
      params.ages = data.ages.join(",");
    }

    // Room type
    if (filterMode === "rooms" && data.roomtype_id) {
      params.roomtype_id = data.roomtype_id;
    }

    // Handle different filter modes
    if (filterMode === "hotels") {
      const urlParams = new URLSearchParams(params);
      router.push(`/${locale}/hotels?${urlParams}`);
      setIsLoading(false);
    } else if (onFilterAction) {
      onFilterAction(params);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.warn("No filter action handler provided for mode:", filterMode);
    }
  };

  const onSubmit = (data: FormValues) => {
    handleSearchParams(data);
  };

  const handleResetFilters = () => {
    reset({
      date: null,
      hotel_id: fixedHotelId ? String(fixedHotelId) : "",
      adults: 0,
      ages: [],
      roomtype_id: "",
    });
  };

  useEffect(() => {
    if (searchParams.size > 0) {
      reset({
        date: parseCheckInOutDates(
          searchParams.get("checkin_date"),
          searchParams.get("checkout_date")
        ),
        hotel_id: fixedHotelId
          ? String(fixedHotelId)
          : searchParams.get("hotel_id") || "",
        adults: Number(searchParams.get("adults")) || 0,
        ages: searchParams.get("ages")?.split(",") || [],
        roomtype_id: searchParams.get("roomtype_id") || "",
      });
    }

    const hotelsOptions = hotels?.map((hotel: any) => ({
      value: String(hotel?.id),
      label: hotel?.name,
    }));
    setHotelsOptions(hotelsOptions);
    setIsLoading(false);
  }, [hotels, searchParams, fixedHotelId, reset]);

  // SVG Icons as components for better reusability
  const LocationIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 14.1704C9.87 14.1704 8.13 12.4404 8.13 10.3004C8.13 8.16043 9.87 6.44043 12 6.44043C14.13 6.44043 15.87 8.17043 15.87 10.3104C15.87 12.4504 14.13 14.1704 12 14.1704ZM12 7.94043C10.7 7.94043 9.63 9.00043 9.63 10.3104C9.63 11.6204 10.69 12.6804 12 12.6804C13.31 12.6804 14.37 11.6204 14.37 10.3104C14.37 9.00043 13.3 7.94043 12 7.94043Z"
        fill="#CAB16C"
      />
      <path
        d="M12 22.76C10.52 22.76 9.02999 22.2 7.86999 21.09C4.91999 18.25 1.65999 13.72 2.88999 8.33C3.99999 3.44 8.26999 1.25 12 1.25C12 1.25 12 1.25 12.01 1.25C15.74 1.25 20.01 3.44 21.12 8.34C22.34 13.73 19.08 18.25 16.13 21.09C14.97 22.2 13.48 22.76 12 22.76ZM12 2.75C9.08999 2.75 5.34999 4.3 4.35999 8.66C3.27999 13.37 6.23999 17.43 8.91999 20C10.65 21.67 13.36 21.67 15.09 20C17.76 17.43 20.72 13.37 19.66 8.66C18.66 4.3 14.91 2.75 12 2.75Z"
        fill="#CAB16C"
      />
    </svg>
  );

  const ResetIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );

  // Check if any field has value to change reset button color
  const hasValues = watch("date") || watch("hotel_id") || watch("adults") > 0 || watch("ages").length > 0 || watch("roomtype_id");

  return (
    <FilterWrrapper>
      <div className="flex flex-col lg:flex-row items-center gap-5">
        {/* Hotel Branch Select */}
        <div className={`w-full lg:w-[30%] relative ${filterMode === "rooms" ? "hidden" : "block"}`}>
          <div className="absolute top-[50%] start-[12px] ">
            <LocationIcon />
          </div>
          <CustomSelect
            className="ps-11"
            options={hotelsOptions}
            label={t("hotel_branch")}
            placeholder={t("select_hotel")}
            name="hotel_id"
            control={control}
            disabled={!!fixedHotelId}
            hasValue={!!watch("hotel_id")}
          />
        </div>

        {/* Room Type Select */}
        {filterMode === "rooms" && (
          <div className="w-full lg:w-[30%] relative">
            <div className="absolute top-[50%] start-[12px] transform ">
              <LocationIcon />
            </div>
            <CustomSelect
              className="ps-11"
              options={roomTypeOptions}
              label={t("room_type")}
              placeholder={t("select_room_type")}
              name="roomtype_id"
              control={control}
              isLoading={isRoomTypesLoading}
              hasValue={!!watch("roomtype_id")}
            />
          </div>
        )}

        {/* Hidden Hotel Select for rooms mode */}
        {filterMode === "rooms" && (
          <div className="hidden">
            <CustomSelect
              options={hotelsOptions}
              name="hotel_id"
              control={control}
              disabled={!!fixedHotelId}
              hasValue={!!watch("hotel_id")}
            />
          </div>
        )}

        {/* Date Picker */}
        <div className="w-full lg:w-[30%] relative flex flex-col gap-[2px]">
          <label className="text-[14px] font-[300] text-white mb-2" htmlFor="date">
            {t("date")}
          </label>
          <DatePickerWithRange lang={locale} control={control} watch={watch} />
        </div>

        {/* Guests */}
        <div className="w-full lg:w-[30%] relative flex flex-col gap-[2px]">
          <label className="text-[14px] font-[300] text-white mb-2" htmlFor="guests">
            {t("guests")}
          </label>
          <Guests setValue={setValue} watch={watch} getValues={getValues} />
        </div>

        {/* Action Buttons */}
        <div className="w-full lg:w-[20%] 2xl:w-[15%] flex items-center gap-2 mt-5">
          <button
            type="button"
            onClick={handleResetFilters}
            disabled={isLoading}
            className={`flex items-center justify-center rounded-full font-bold p-4 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              hasValues 
                ? "bg-[#CAB16C] text-white hover:bg-[#b89d5a]" 
                : "bg-white text-[#CAB16C] hover:bg-[#CAB16C] hover:text-white"
            }`}
          >
            <ResetIcon />
          </button>
          
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="flex-1 rounded-full font-bold bg-white py-4 px-4 text-[#CAB16C] hover:bg-[#CAB16C] hover:text-white transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? t("loading") : t("show_results")}
          </button>
        </div>
      </div>
    </FilterWrrapper>
  );
};

export default HomeFilter;
      