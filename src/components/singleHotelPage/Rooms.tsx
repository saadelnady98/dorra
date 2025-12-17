"use client";

import room from "@/public/card.webp";
import Container from "@/components/reusableComponent/Container";
import MainButton from "@/components/reusableComponent/MainButton";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import HotelImageGrid from "../reusableComponent/HotelImageGrid";
import ImageModal from "../reusableComponent/ImageModal";
import pic1 from "@/public/card.webp";
import pic5 from "@/public/card.webp";
import ReservationModal from "../reusableComponent/ReservationModal";
import defaultimg from "@/public/defaultimg.webp";
import RoomCardSkeleton from "./RoomCardSkeleton";

const Rooms = ({
  data,
  isLoading = false,
  hotelData,
}: {
  data: any;
  isLoading?: boolean;
  hotelData: any;
}) => {
  const t = useTranslations("SingleHotelPage");
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const openModal = (modulName: string) => {
    setIsModalOpen(modulName);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <Container>
        <div className="flex flex-col gap-8">
          <h2 className="text-white text-2xl lg:text-3xl font-bold">
            {t("available_rooms")}
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <RoomCardSkeleton key={idx} />
              ))}
            </div>
          ) : data && data.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {data.map((item: any) => (
                <div
                  key={item?.id}
                  className="group bg-white bg-opacity-5 border border-white/10 rounded-3xl overflow-hidden hover:bg-opacity-10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1"
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={item?.room_type?.image?.original_url || defaultimg}
                      width={500}
                      height={300}
                      alt={item?.room_type?.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-[#CAB16C] font-semibold text-sm">
                        {item?.room_size}
                      </span>
                    </div> */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <div className="bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                        <Icon
                          icon="mdi:bed"
                          className="text-[#CAB16C] text-xs"
                        />
                        <span className="text-white text-xs">
                          {item?.bed_count}
                        </span>
                      </div>
                      <div className="bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                        <Icon
                          icon="mdi:account"
                          className="text-[#CAB16C] text-xs"
                        />
                        <span className="text-white text-xs">
                          {item?.max_guest_count}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5">
                    {/* Title and Price */}
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-white text-lg font-bold line-clamp-2 min-h-[3rem]">
                        {item?.room_type?.name}
                      </h3>
                      <div className="text-right flex-shrink-0 ml-3">
                        <div className="text-[#CAB16C] text-xl font-bold">
                          {item?.price_per_night} {t("sar")}
                        </div>
                        <div className="text-white/70 text-xs">
                          {t("for1night")}
                        </div>
                      </div>
                    </div>

                    {/* Amenities - Limited to 3 with wrap */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {item?.room_type?.amenities
                          ?.slice(0, 3)
                          .map((amenity: any) => (
                            <div
                              key={amenity?.id}
                              className="flex items-center gap-1 bg-white/5 rounded-lg px-2 py-1"
                            >
                              <Image
                                src={amenity?.image?.original_url || defaultimg}
                                width={16}
                                height={16}
                                alt={amenity?.name}
                                className="w-4 h-4 flex-shrink-0"
                              />
                              <span className="text-white text-xs whitespace-nowrap truncate max-w-[80px]">
                                {amenity?.name}
                              </span>
                            </div>
                          ))}
                        {item?.room_type?.amenities?.length > 3 && (
                          <div className="bg-white/5 rounded-lg px-2 py-1">
                            <span className="text-[#CAB16C] text-xs font-medium">
                              +{item?.room_type?.amenities?.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => {
                          setSelectedRoom(item);
                          openModal("room");
                        }}
                        className="flex-1 bg-transparent border border-[#CAB16C] text-[#CAB16C] hover:bg-[#CAB16C] hover:text-white py-2 px-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-1 text-sm"
                      >
                        <Icon icon="mdi:eye" className="text-base" />
                        {t("show_details")}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRoom(item);
                          openModal("reservation");
                        }}
                        className="flex-1 bg-[#CAB16C] text-white hover:bg-[#b89d5a] py-2 px-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-1 text-sm"
                      >
                        <Icon icon="mdi:cart" className="text-base" />
                        {t("add_to_card")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Icon
                  icon="mdi:magnify"
                  className="text-[#CAB16C]"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">
                {t("no_rooms_available")}
              </h3>
              <p className="text-white/70 text-base max-w-md">
                {t("try_different_search")}
              </p>
            </div>
          )}
        </div>
      </Container>

      {/* Enhanced Room Details Modal */}
      {isModalOpen === "room" && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4">
          <div className="bg-[#1C1B19] rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
              <h2 className="text-white text-2xl font-bold truncate pr-4">
                {selectedRoom?.room_type?.name}
              </h2>
              <button
                onClick={closeModal}
                className="text-white hover:text-[#CAB16C] transition-colors duration-300 p-2 rounded-lg hover:bg-white/10 flex-shrink-0"
                aria-label="Close"
              >
                <Icon icon="mdi:close" className="text-2xl" />
              </button>
            </div>

            {/* Content with custom scrollbar */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-6">
                {/* Images Grid */}
                <div className="mb-6">
                  <HotelImageGrid
                    cardStyle
                    images={selectedRoom?.images || []}
                    openModal={() => openModal("slider")}
                    showPhotoText={t("Show50photo")}
                    fallbackImages={{
                      main: pic1,
                      others: pic5,
                    }}
                    isOriginalUrl={true}
                  />
                </div>

                {/* Room Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Description & Features */}
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-white text-xl font-bold mb-4">
                        {t("description")}
                      </h3>
                      <p className="text-white/80 text-base leading-relaxed">
                        {selectedRoom?.room_type?.description ||
                          t("no_description_available")}
                      </p>
                    </div>

                    {/* Room Features */}
                    <div>
                      <h3 className="text-white text-xl font-bold mb-4">
                        {t("room_features")}
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {/* <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                          <Icon
                            icon="mdi:ruler"
                            className="text-[#CAB16C] text-xl"
                          />
                          <div>
                            <div className="text-white/70 text-sm">
                              {t("size")}
                            </div>
                            <div className="text-white font-semibold">
                              {selectedRoom?.room_size}
                            </div>
                          </div>
                        </div> */}
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                          <Icon
                            icon="mdi:bed"
                            className="text-[#CAB16C] text-xl"
                          />
                          <div>
                            <div className="text-white/70 text-sm">
                              {t("beds")}
                            </div>
                            <div className="text-white font-semibold">
                              {selectedRoom?.bed_count}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                          <Icon
                            icon="mdi:account"
                            className="text-[#CAB16C] text-xl"
                          />
                          <div>
                            <div className="text-white/70 text-sm">
                              {t("max_guests")}
                            </div>
                            <div className="text-white font-semibold">
                              {selectedRoom?.max_guest_count}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                          <Icon
                            icon="mdi:door-open"
                            className="text-[#CAB16C] text-xl"
                          />
                          <div>
                            <div className="text-white/70 text-sm">
                              {t("available")}
                            </div>
                            <div className="text-white font-semibold">
                              {selectedRoom?.available_rooms}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Amenities */}
                  <div>
                    <h3 className="text-white text-xl font-bold mb-4">
                      {t("amenities")}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedRoom?.room_type?.amenities?.map(
                        (amenity: any) => (
                          <div
                            key={amenity?.id}
                            className="flex items-center gap-3 p-3 bg-white/5 rounded-xl"
                          >
                            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Image
                                src={amenity?.image?.original_url || defaultimg}
                                width={20}
                                height={20}
                                alt={amenity?.name}
                                className="w-5 h-5"
                              />
                            </div>
                            <span className="text-white font-medium text-sm lg:text-base">
                              {amenity?.name}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-white/5">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <div className="text-[#CAB16C] text-2xl font-bold">
                    {selectedRoom?.price_per_night} {t("sar")}
                  </div>
                  <div className="text-white/70 text-sm">{t("for1night")}</div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedRoom(selectedRoom);
                      openModal("reservation");
                    }}
                    className="bg-[#CAB16C] hover:bg-[#b89d5a] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2"
                  >
                    <Icon icon="mdi:cart" className="text-lg" />
                    {t("add_to_card")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Slider Modal */}
      {isModalOpen === "slider" && (
        <ImageModal
          images={selectedRoom?.images || []}
          onClose={() => openModal("room")}
          className="bg-black"
        />
      )}

      {/* Reservation Modal */}
      {isModalOpen === "reservation" && (
        <ReservationModal
          defaultValues={selectedRoom}
          onClose={() => closeModal()}
          className="bg-black"
          hotelData={hotelData}
        />
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cab16c;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b89d5a;
        }
      `}</style>
    </>
  );
};

export default Rooms;
