"use client";

import { useState, useEffect } from "react";
import HomeFilter from "../shared/filter/HomeFilter";
import Rooms from "./Rooms";
import { useQuery } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";
import { useRouter, useSearchParams } from "next/navigation";

interface RoomsContainerProps {
  initialRooms: any[];
  hotelId: string | number;
  locale: string;
  hotelData: any;
}

const RoomsContainer = ({
  initialRooms,
  hotelId,
  locale,
  hotelData,
}: RoomsContainerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Create a new URLSearchParams object from the current searchParams
  const createQueryString = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    // Add or update params
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    return newParams.toString();
  };

  // Always ensure hotel_id is present in the query
  useEffect(() => {
    if (hotelId && !searchParams.get("hotel_id")) {
      const newQueryString = createQueryString({ hotel_id: String(hotelId) });
      router.push(`?${newQueryString}`, { scroll: false });
    }
  }, [hotelId, searchParams]);

  // Use React Query to fetch filtered rooms
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["filteredRooms", searchParams.toString()],
    queryFn: () =>
      apiServiceCall({
        url: `filter?${searchParams.toString()}`,
        method: "GET",
        headers: {
          "Accept-language": locale,
        },
      }),
    initialData: { data: initialRooms },
    enabled: searchParams.size > 0,
  });

  // Handle filter action - update URL parameters
  const handleFilterAction = (filterParams: Record<string, string>) => {
    const queryString = createQueryString(filterParams);
    router.push(`?${queryString}`, { scroll: false });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <HomeFilter
          locale={locale}
          hotels={[]}
          fixedHotelId={hotelId}
          filterMode="rooms"
          onFilterAction={handleFilterAction}
        />
      </div>

      <div className="w-full" id="rooms">
        <Rooms
          data={data?.data || []}
          isLoading={isLoading}
          hotelData={hotelData}
        />
      </div>
    </>
  );
};

export default RoomsContainer;
