"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { DatePickerWithRange } from "./RangeDatepiker";
import Guests, { Counter } from "./Gustes";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import Image from "next/image";
import defaultimg from "@/public/defaultimg.webp";
import building from "@/public/building.svg";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addCartItem, updateCartItem } from "@/store/slices/cartSlice";
import apiServiceCall from "@/lib/apiServiceCall";
import { formatDate } from "@/lib/utils";
import { CartItem } from "@/store/slices/types";
import { useLocale } from "next-intl";
interface ReservationModalProps {
  defaultValues: any;
  onClose: () => void;
  className?: string;
  editmode?: boolean;
  indexToUpdateCartInlocalstorage?: number;
  hotelData?: any;
  selectedRoom?: any;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  defaultValues,
  editmode,
  indexToUpdateCartInlocalstorage,
  onClose,
  className = "",
  hotelData,
  selectedRoom,
}) => {
  const t = useTranslations("Cart");
  const translation = useTranslations("filter");
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [quantity, setQuantity] = useState(defaultValues?.quantity || 1);
  const locale = useLocale();
  const defaultDateValue =
    defaultValues?.checkin_date && defaultValues?.checkout_date
      ? {
          from: new Date(defaultValues.checkin_date),
          to: new Date(defaultValues.checkout_date),
        }
      : "";

  const { control, getValues, setValue, handleSubmit, watch } = useForm({
    defaultValues: {
      date: defaultDateValue,
      branch: "",
      adults: defaultValues?.adults || 0,
      ages: defaultValues?.ages || [],
    },
  });

  const onSubmit = async (data: any) => {
    const bodyForAPI = {
      room_id: defaultValues?.id,
      checkin_date: formatDate(data?.date?.from),
      checkout_date: formatDate(data?.date?.to),
      adults: data?.adults,
      children: data?.ages?.length,
    };
    const hasZeroAge = (data.ages || []).includes("0");
    if (hasZeroAge) {
      return; 
    }
    try {
      setIsPending(true);
      const res = await apiServiceCall({
        url: "cart",
        method: "POST",
        body: bodyForAPI,
        headers: {
          "Accept": "application/json",
          "Accept-Language": locale,
        },
      });

      if (res?.data?.status) {
        const cartItem: CartItem = {
          id: defaultValues?.id,
          images: defaultValues?.images,
          checkin_date: formatDate(data?.date?.from),
          checkout_date: formatDate(data?.date?.to),
          adults: data?.adults,
          ages: data?.ages,
          children: data?.ages?.length,
          price_per_night: defaultValues?.price_per_night,
          room_type: defaultValues?.room_type,
          hotel: hotelData || selectedRoom?.hotel,
        };

        if (res.data.data.available_rooms >= quantity) {
          cartItem.quantity = quantity;
        } else {
          cartItem.quantity = res.data.data.available_rooms;
          toast.error(t("quantity_exceeded"));
          return;
        }

        if (editmode && indexToUpdateCartInlocalstorage !== undefined) {
          dispatch(
            updateCartItem({
              index: indexToUpdateCartInlocalstorage,
              updatedItem: cartItem,
            })
          );
          toast.success(t("updated_successfully"));
        } else {
          dispatch(addCartItem(cartItem));
          toast.success(t("added_to_cart"));
        }

        onClose();
      } else {
        const apiErrors = res?.data?.errors;
        if (Array.isArray(apiErrors)) {
          apiErrors.forEach((msg: string) => toast.error(msg));
        } else if (res?.data?.message) {
          toast.error(res.data.message);
        } else {
          toast.error("حدث خطأ أثناء الإضافة");
        }
      }
    } catch (err: any) {
      toast.error(err?.errors?.message || "Something went wrong");
    } finally {
      setIsPending(false);
    }
  };
  useEffect(() => {
    if (editmode) {
      setQuantity(defaultValues?.quantity || 1);
    }
  }, [editmode, defaultValues?.quantity]);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-[999] p-4">
      <div
        className={`relative w-full max-w-4xl mx-auto bg-[#1C1B19] rounded-3xl shadow-2xl overflow-hidden ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
          <h2 className="text-white text-2xl font-bold">{t("add_to_card")}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-[#CAB16C] transition-colors duration-300 p-2 rounded-lg hover:bg-white/10"
            aria-label="Close"
          >
            <Icon icon="mdi:close" className="text-2xl" />
          </button>
        </div>

        {/* Scroll */}
        <div className="max-h-[70vh] overflow-y-auto custom-scrollbar p-6">
          {/* Room Info */}
          <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
            <div className="flex flex-col md:flex-row gap-6">
              <Image
                src={defaultValues?.images?.[0]?.original_url || defaultimg}
                width={200}
                height={150}
                alt={defaultValues?.room_type?.name}
                className="w-full md:w-48 h-36 object-cover rounded-2xl"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    {defaultValues?.room_type?.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 mb-4">
                    <Image
                      src={building || defaultimg}
                      width={20}
                      height={20}
                      alt="Building"
                    />
                    <span>{defaultValues?.hotel_name}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-[#CAB16C]">
                    <span className="text-2xl font-bold">
                      {defaultValues?.price_per_night}
                    </span>
                    <span className="text-white ml-1">{t("sar")}</span>
                    <span className="text-white/70 block text-sm">
                      / {t("night")}
                    </span>
                  </div>
                  <div className="flex gap-3 text-white/70">
                    <div className="flex items-center gap-1">
                      <Icon icon="mdi:bed" className="text-[#CAB16C]" />
                      <span>{defaultValues?.bed_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon icon="mdi:account" className="text-[#CAB16C]" />
                      <span>{defaultValues?.max_guest_count}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <label className="block text-white text-lg font-semibold mb-4">
                {translation("date")}
              </label>
              <DatePickerWithRange
                control={control}
                watch={watch}
                lang={locale}
              />
            </div>

            {editmode && (
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <Counter
                  label={t("quantity")}
                  value={quantity}
                  min={1}
                  max={100}
                  onIncrement={() => setQuantity((prev: number) => prev + 1)}
                  onDecrement={() => setQuantity((prev: number) => prev - 1)}
                />
              </div>
            )}

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <label className="block text-white text-lg font-semibold mb-4">
                {translation("guests")}
              </label>
              <Guests setValue={setValue} watch={watch} getValues={getValues} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-white/5">
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
            className="w-full bg-[#CAB16C] hover:bg-[#b89d5a] text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
          >
            {isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t("processing")}
              </>
            ) : (
              <>
                <Icon icon="mdi:cart" className="text-xl" />
                {editmode ? t("update_cart") : t("add_to_card")}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
