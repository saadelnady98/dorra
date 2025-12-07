"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "@/components/ui/CustomInput";
import { useTranslations } from "next-intl";
import CostumPhoneInput from "@/components/reusableComponent/PhoneInput";
import MainButton from "@/components/reusableComponent/MainButton";
import { useMutation } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";
import CustomTextarea from "../ui/CustomTextarea";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import toast from "react-hot-toast";
import { removeCart } from "@/store/slices/cartSlice";

 const getFormSchema = (t: any) =>
  z.object({
    firstName: z.string().min(1, t("first_name_required")),
    lastName: z.string().min(1, t("last_name_required")),
    email: z.string().email(t("invalid_email")),
    phone: z.string().min(1, t("phone_required")),
    message: z.string().min(1, t("message_required")),
  });

type FormData = z.infer<ReturnType<typeof getFormSchema>>;

const CartForm = ({
  btnAlignEnd,
  withMessage,
}: {
  btnAlignEnd?: boolean;
  withMessage?: boolean;
}) => {
  const t = useTranslations("Cart");
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const formSchema = getFormSchema(t);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { mutate } = useMutation({
    mutationFn: (data: any) =>
      apiServiceCall({ url: "cart/checkout", body: data, method: "POST" }),
    onError: (err: any) => {
      const msg =
        err?.errors?.message ||
        err?.message ||
        t("something_went_wrong", { fallback: "Something went wrong, please try again / حدث خطأ، يرجى المحاولة مرة أخرى" });
      toast.error(msg);
    },
    onSuccess: () => {
      toast.success(t("sent_successfully"));
      dispatch(removeCart());
      reset();
    },
  });

  const onSubmit = (data: FormData) => {
    let room_reservations = cart?.map((item) => ({
      room_id: item?.id,
      checkin_date: item?.checkin_date,
      checkout_date: item?.checkout_date,
      adults: item?.adults,
      ages: item?.ages?.length,
    }));

    const formData = new FormData();
    formData.append("name", `${data.firstName} ${data.lastName}`);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("message", data.message);

    room_reservations?.forEach(
      (reservation, index) => {
        formData.append(`room_reservations[${index}][room_id]`, reservation.room_id.toString());
        formData.append(`room_reservations[${index}][checkin_date]`, reservation.checkin_date.toString().split("T")[0]);
        formData.append(`room_reservations[${index}][checkout_date]`, reservation.checkout_date.toString().split("T")[0]);
        formData.append(`room_reservations[${index}][adults]`, reservation.adults.toString());
        formData.append(`room_reservations[${index}][ages]`, reservation.ages.toString());
      }
    );

    mutate(formData);
  };

  return (
    <form
      className="w-full bg-white bg-opacity-5 p-5 rounded-3xl border border-[#FFFFFF33]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-medium mb-5">{t("form_title")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          label={t("first_name")}
          name="firstName"
          placeholder=""
          register={register}
          error={errors.firstName?.message}
        />
        <CustomInput
          label={t("last_name")}
          name="lastName"
          placeholder=""
          register={register}
          error={errors.lastName?.message}
        />
      </div>

      <CustomInput
        label={t("email")}
        name="email"
        type="email"
        placeholder=""
        register={register}
        error={errors.email?.message}
      />

      <Controller
        name="phone"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <CostumPhoneInput
            className="mt-5"
            label={t("phone_number")}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      {errors.phone && (
        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
      )}

      {withMessage && (
        <CustomTextarea
          label={t("message")}
          name="message"
          placeholder=""
          register={register}
          error={errors.message?.message}
        />
      )}

      <div
        className={`mt-7 lg:mt-10 w-full flex items-center ${
          btnAlignEnd ? "justify-end" : "justify-center"
        }`}
      >
        <MainButton
          className={btnAlignEnd ? "w-fit" : "w-full"}
          type="submit"
          styleMe
        >
          {t("send")}
        </MainButton>
      </div>
    </form>
  );
};

export default CartForm;
