"use client";

import React, { useEffect, useState } from "react";
import Container from "@/components/reusableComponent/Container";
import SectionTitle from "@/components/reusableComponent/SectionTitle";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomInput from "@/components/ui/CustomInput";
import calendar from "@/public/calendar.svg";
import profile from "@/public/profile.svg";
import defaultimg from "@/public/defaultimg.webp";

import toast from "react-hot-toast";
import Image from "next/image";
import apiServiceCall from "@/lib/apiServiceCall";
import { useMutation } from "@tanstack/react-query";
import OtpModal from "@/components/rerservation/OtpModal";
import { formatDateRange, getValidRefundToken } from "@/lib/utils";
import RefundModal from "@/components/rerservation/RefundModal";
type ApiError = {
  errors?: {
    message?: string;
  };
};
type ReservationData = {
  id: string;
  room_type_name: string;
  hotel_address: string;
  checkin_date: string;
  checkout_date: string;
  adults: number;
  children: number;
  price_per_night: number;
  image_url: string;
  hotel: string;
  reservation_date: string;
  status: string;
  total_cost: number;
  name: string;
  email: string;
  phone: string;
  rooms: Room[];
};
interface Room {
  id: string | number;
  room_type: string;
  image: {
    image_url: string;
  };
  checkin_date: string;
  checkout_date: string;
  adults: number;
  children: number;
  price_per_night: number | string;
}

const formSchema = (t: any) =>
  z.object({
    email: z
      .string()
      .min(1, t("email_required")) // required first
      .email(t("invalid_email")), // then validate email format
  });

type FormData = z.infer<ReturnType<typeof formSchema>>;

export default function ReservationsPage() {
  const t = useTranslations("Reservations");
  const [reservations, setReservations] = useState<ReservationData[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<
    string | null
  >(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema(t)),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (email: string) =>
      apiServiceCall({
        url: `refund/request_otp`,
        method: "POST",
        body: {
          email: email,
        },
      }),
    onError: (err: any) => {
      const msg =
        err?.errors?.message || err?.message || t("something_went_wrong");
      toast.error(msg);
    },
    onSuccess: (res: any) => {
      toast.success(t("otp_sent_message"));
      setIsOtpModalOpen(true);
    },
  });

  const onSubmit = (data: FormData) => {
    setEmailForOtp(data.email);
    mutate(data.email);
  };

  const onVerify = async (otp: string) => {
    if (otp.length < 6) {
      toast.error(t("otp_length_error"));
      return;
    }
    if (!emailForOtp) return;
    setIsLoading(true);

    try {
      const res = await apiServiceCall({
        url: `refund/verify_otp`,
        method: "POST",
        body: {
          email: emailForOtp,
          otp: otp,
        },
      });

      const token = res?.data?.token;
      if (!token) throw new Error("Token not found");

      const expiresAt = Date.now() + 2 * 60 * 60 * 1000;

      localStorage.setItem(
        "refund_auth",
        JSON.stringify({
          token,
          expiresAt,
        })
      );

      toast.success(t("otp_verified"));
      setIsOtpModalOpen(false);
      setHasSubmitted(true);
      fetchReservations();
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(error.errors?.message || t("something_went_wrong"));
      setIsOtpModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReservations = async () => {
    const token = getValidRefundToken();
    if (!token) {
      setHasSubmitted(false);
      toast.error(t("session_expired"));
      return;
    }
    console.log("token ya saad", token);

    try {
      setIsLoading(true);
      const res = await apiServiceCall({
        url: "refund/reservations",
        method: "POST",
        body: { token },
      });

      setReservations(res?.data);
      setHasSubmitted(true);
    } catch (err: any) {
      handleTokenError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenError = (err: any) => {
    const msg = err?.message;

    if (msg === "messages.tokenExpiredOrInvalid" || msg === "INVALID_TOKEN") {
      localStorage.removeItem("refund_auth");

      toast.error(t("session_expired"));
      setHasSubmitted(false);
      setReservations([]);
      return;
    }

    toast.error(t("something_went_wrong"));
  };

  const handleRefund = async (reservationId: string) => {
    try {
      const token = getValidRefundToken();
      const res = await apiServiceCall({
        url: `refund/cancel`,
        method: "POST",
        body: {
          token,
          reservation_id: reservationId,
        },
      });

      const message = res?.data?.[0]?.message;
      const totalRefund = res?.data?.[1]?.total_refund;

      toast.success(
        totalRefund ? `${message} - ${totalRefund} ${t("sar")}` : message
      );
      fetchReservations();
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(error?.errors?.message || t("something_went_wrong"));
      setIsOtpModalOpen(true);
    }
  };
  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <Container>
      <SectionTitle
        className="!mt-24"
        title={t("title")}
        description={t("description")}
      />

      {/* Form */}
      {!hasSubmitted && reservations.length === 0 && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" bg-white bg-opacity-5 p-5 rounded-3xl border border-[#FFFFFF33] flex-col  flex items-center gap-2 lg:w-[60%] mx-auto"
        >
          <div className="w-full lg:flex-1 h-[120px]">
            <CustomInput
              label={t("email")}
              name="email"
              type="email"
              placeholder=""
              register={register}
              error={errors.email?.message}
            />
          </div>
          <button
            type="submit"
            className={` w-full ${
              isPending ? "cursor-not-allowed" : ""
            }  h-[50px] inline-flex items-center max-lg:text-[16px] justify-center   px-5 lg:px-9 bg-white text-[#CAB16C] rounded-[40px] hover:bg-[#CAB16C] hover:text-white transition-colors`}
            disabled={isPending}
          >
            {isPending ? t("loading") : t("send")}
          </button>
        </form>
      )}

      {/* Cards */}
      <div className="w-full mt-5 flex flex-col gap-4">
        {isLoading ? (
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
        ) : reservations.length > 0 ? (
          reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="flex flex-col gap-6 rounded-3xl border border-[#ffffff20] p-6 bg-white/5"
            >
              {/* Reservation Header */}
              <div className="flex items-center justify-between border-b border-white/10">
                <div className="flex flex-col gap-2  pb-4">
                  <h3 className="text-white text-2xl font-semibold">
                    {reservation.hotel}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-white/70 text-sm">
                    <span>
                      {t("reservation_date")}: {reservation.reservation_date}
                    </span>
                    <span>
                      {t("status")}: {reservation.status}
                    </span>
                  </div>
                  <div className="text-[#CAB16C] font-semibold text-lg flex items-center gap-2">
                    <span>{t("total_cost")}</span> : {reservation.total_cost}{" "}
                    {t("sar")}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedReservationId(reservation.id);
                    setIsCancelModalOpen(true);
                  }}
                  className="inline-flex items-center justify-center h-[48px] px-5 lg:px-9
    bg-white text-[#CAB16C] rounded-[40px]
    hover:bg-[#CAB16C] hover:text-white transition-colors"
                >
                  {t("refund")}
                </button>
              </div>
              <div className="border-b border-white/10 pb-5">
                <h2 className="text-[20px] mb-3">{t("user_details")}</h2>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#CAB16C]">{t("name")}</span> :
                  {reservation?.name}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#CAB16C]">{t("email")}</span> :{" "}
                  {reservation?.email}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#CAB16C]">{t("phone")}</span> :
                  {reservation?.phone}
                </div>
              </div>

              {/* Rooms */}
              <div className="grid grid-cols-1 md:grid-cols-2   gap-4">
                {reservation.rooms.map((room: Room, index) => (
                  <div
                    key={`${room.id}-${index}`}
                    className="flex flex-col md:flex-row gap-6 p-4 rounded-2xl bg-white/5 border border-white/10"
                  >
                    {/* Image placeholder */}
                    <div className="w-full md:max-w-[180px] h-[140px] bg-white/10 rounded-2xl flex items-center justify-center text-white/40 ">
                      <Image
                        src={room?.image?.image_url ?? defaultimg}
                        width={600}
                        height={500}
                        alt="room"
                        className="w-full h-full rounded-2xl"
                      />
                    </div>

                    <div className="flex flex-col justify-between gap-3 w-full">
                      <div className="flex flex-col gap-2">
                        <h4 className="text-white text-xl font-medium">
                          {room.room_type}
                        </h4>

                        <div className="flex gap-2">
                          <Image
                            src={calendar}
                            width={50}
                            height={50}
                            alt="calendar"
                            className="w-5 h-5"
                            unoptimized
                          />
                          <span className="text-white text-sm lg:text-base">
                            {formatDateRange(
                              room.checkin_date,
                              room.checkout_date,
                              "en"
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
                            unoptimized
                          />
                          <div className="text-white/70 text-sm">
                            {room.adults && (
                              <>
                                {room.adults} {t("adults")}
                              </>
                            )}

                            {room.children > 0 && (
                              <>
                                {" • "}
                                {room.children} {t("children")}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-[#CAB16C] font-semibold text-lg">
                        {room.price_per_night} {t("sar")}
                        <span className="text-white/60 text-sm">
                          {" "}
                          / {t("night")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          hasSubmitted && (
            <div className="text-center text-white/50 text-lg">
              {t("no_reservations_found")}
            </div>
          )
        )}
        <OtpModal
          open={isOtpModalOpen}
          onOpenChange={setIsOtpModalOpen}
          onVerify={onVerify}
        />

        <RefundModal
          open={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          onConfirm={() => {
            if (!selectedReservationId) return;
            handleRefund(selectedReservationId);
            setIsCancelModalOpen(false);
          }}
        />
      </div>
    </Container>
  );
}
