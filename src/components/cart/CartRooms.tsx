"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";

import edit from "@/public/edit.svg";
import trash from "@/public/trashc.svg";
import calendar from "@/public/calendar.svg";
import hotelIcon from "@/public/hotel.svg";
import profile from "@/public/profile.svg";
import { formatDateRange, formatDateToMonthDay } from "@/lib/utils";
import ReservationModal from "../reusableComponent/ReservationModal";
import Trash from "../reservation-cart/Trash";
import defaultimg from "@/public/defaultimg.webp";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { removeCartItem } from "@/store/slices/cartSlice";
import toast from "react-hot-toast";

function CartRooms() {
  const { cart } = useSelector((state: RootState) => state.cart);

  const t = useTranslations("Cart");
  const locale = useLocale();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState<string | false>(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [indexToUpdateCart, setIndexToUpdateCart] = useState<number | null>(
    null
  );
  const [indexToDeleteFromCart, setIndexToDeleteFromCart] = useState<
    number | null
  >(null);

  const handleDeleteRoom = (index: number) => {
    dispatch(removeCartItem(index!));
    setIsModalOpen(false);
    toast.success(t("deleted_from_cart_successfully"));
  };
  const [loading, setLoading] = useState(true); // shimmer state

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1s shimmer
    return () => clearTimeout(timer);
  }, []);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  const getNumberOfNights = (checkin?: string, checkout?: string) => {
    if (!checkin || !checkout) return 0;

    const start = new Date(checkin);
    const end = new Date(checkout);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diff = end.getTime() - start.getTime();
    const days = Math.round(diff / (1000 * 60 * 60 * 24));

    return days > 0 ? days : 0;
  };
  const totalPrice = (cart || []).reduce((acc: number, room: any) => {
    const nights = getNumberOfNights(room?.checkin_date, room?.checkout_date);
    const pricePerNight = Number(room?.price_per_night) || 0;
    return acc + nights * pricePerNight;
  }, 0);

  return (
    <div className="p-4 bg-white bg-opacity-5 rounded-3xl overflow-hidden border border-[#FFFFFF33]">
      <h2 className="text-2xl font-medium mb-4">{t("selected_rooms")}</h2>

      {loading ? (
        // Shimmer loading
        <div className="grid grid-cols-1 gap-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row p-4 gap-7 border-b border-[#ffffff20] rounded-3xl animate-pulse bg-white/5"
            >
              <div className="aspect-[1/1] w-full md:max-w-[180px] bg-white/10 rounded-3xl"></div>
              <div className="flex-1 flex flex-col justify-around gap-4">
                <div className="h-6 bg-white/10 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-white/10 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-white/10 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-white/10 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : cart && cart.length > 0 ? (
        // Render actual cart items
        cart.map((item, index) => (
          <div key={index} className="flex flex-col rounded-3xl">
            <div className="flex flex-col md:flex-row p-4 gap-7 border-b border-[#ffffff20]">
              <Image
                src={item?.images?.[0]?.original_url || defaultimg}
                width={500}
                height={500}
                alt={item?.room_type?.name || "room"}
                className="aspect-[1/1] w-full md:max-w-[180px] object-cover rounded-3xl"
              />

              <div className="flex flex-col justify-around gap-4 w-full">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-white text-[24px]">
                    <span>{item?.room_type?.name}</span>
                    <div className="flex gap-1">
                      <div
                        className="bg-[#FFFFFF0D] hover:bg-[#FFFFFF33] duration-300 rounded-md p-2 flex items-center justify-center cursor-pointer"
                        onClick={() => {
                          setIndexToUpdateCart(index);
                          setSelectedRoom(item);
                          setIsModalOpen("reservation");
                        }}
                      >
                        <Image
                          className="w-[20px] h-[20px]"
                          src={edit || defaultimg}
                          width={50}
                          height={50}
                          alt="edit"
                        />
                      </div>
                      <div
                        className="bg-[#FFFFFF0D] hover:bg-[#FFFFFF33] duration-300 rounded-md p-2 flex items-center justify-center cursor-pointer"
                        onClick={() => {
                          setIndexToDeleteFromCart(index);
                          setSelectedRoom(item);
                          setIsModalOpen("trash");
                        }}
                      >
                        <Image
                          className="w-[20px] h-[20px]"
                          src={trash || defaultimg}
                          width={50}
                          height={50}
                          alt="delete"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Image
                      src={hotelIcon || defaultimg}
                      width={50}
                      height={50}
                      alt="calendar"
                      className="w-5 h-5"
                    />
                    <span className="text-white text-sm lg:text-base">
                      {item?.hotel.name}- {item?.hotel?.address}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Image
                      src={calendar || defaultimg}
                      width={50}
                      height={50}
                      alt="calendar"
                      className="w-5 h-5"
                    />
                    <span className="text-white text-sm lg:text-base">
                      {formatDateRange(
                        item?.checkin_date,
                        item?.checkout_date,
                        locale
                      )}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Image
                      src={profile || defaultimg}
                      width={50}
                      height={50}
                      alt="profile"
                      className="w-5 h-5"
                    />
                    <span className="text-white text-sm lg:text-base">
                      {item?.adults} {t("adults")} - {item?.ages?.length}{" "}
                      {t("children")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-[15px] sm:text-[19px] lg:text-[20px] font-semibold">
                  <span className="text-gold text-[#CAB16C]">
                    {item?.price_per_night} {t("sar")}
                  </span>
                  <span className="text-white">/ {t("night")}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-white/50 text-lg">
          {t("no_rooms_selected")}
        </div>
      )}
      {cart?.length > 0 && (
        <div className="mt-5 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xl">
            <span className="font-light">{t("total")}</span>
            <span className="font-normal text-[#CAB16C]">
              {totalPrice} {t("sar")}
            </span>
          </div>
        </div>
      )}

      {/* Reservation Modal */}
      {isModalOpen === "reservation" && selectedRoom && (
        <ReservationModal
          editmode
          indexToUpdateCartInlocalstorage={indexToUpdateCart}
          defaultValues={selectedRoom}
          onClose={() => setIsModalOpen(false)}
          className="bg-black"
          selectedRoom={selectedRoom}
        />
      )}

      {/* Trash Modal */}
      {isModalOpen === "trash" && selectedRoom !== null && (
        <Trash
          open={isModalOpen === "trash"}
          close={() => setIsModalOpen(false)}
          onDelete={() => {
            handleDeleteRoom(indexToDeleteFromCart!);
          }}
        />
      )}
    </div>
  );
}

export default CartRooms;
