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
import { useLocale } from "next-intl";

const baseSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone number is required"),
});

const withMessageSchema = baseSchema.extend({
  message: z.string().optional(),
});

const getFormSchema = (withMessage: boolean) => {
  return withMessage ? withMessageSchema : baseSchema;
};

const ContactForm = ({
  btnAlignEnd,
  withMessage,
}: {
  btnAlignEnd?: boolean;
  withMessage?: boolean;
}) => {
  const t = useTranslations("ContactUsSection");
  const locale = useLocale(); // Get current locale

  // Dynamically set the form schema based on withMessage prop
  const formSchema = getFormSchema(!!withMessage);
  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isError, isSuccess, error } = useMutation({
    mutationFn: (data) =>
      apiServiceCall({ url: "contacts", body: data, method: "POST" }),
  });

  const onSubmit = (data: any) => {
    const submissionData = !withMessage && data.message
      ? { ...data, message: undefined }
      : data;
      
    mutate(submissionData);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          label={t("first_name")}
          name="firstName"
          placeholder=""
          register={register}
          error={errors.firstName?.message}
          locale={locale}
        />
        <CustomInput
          label={t("last_name")}
          name="lastName"
          placeholder=""
          register={register}
          error={errors.lastName?.message}
          locale={locale}
        />
      </div>

      <CustomInput
        label={t("email")}
        name="email"
        type="email"
        placeholder=""
        register={register}
        error={errors.email?.message}
        locale={locale}
      />

      <Controller
        name="phone"
        control={control}
        defaultValue=""
        rules={{ required: t("phone_required") }}
        render={({ field }) => (
          <CostumPhoneInput
            className="mt-5"
            label={t("phone_number")}
            value={field.value}
            onChange={field.onChange}
            locale={locale}
          />
        )}
      />
      {errors.phone && (
        <p className={`text-red-500 text-sm mt-1 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
          {errors.phone.message}
        </p>
      )}

      {withMessage && (
        <CustomTextarea
          label={t("message")}
          name="message"
          placeholder=""
          register={register}
          error={errors.message?.message}
          locale={locale}
        />
      )}

      {errors?.message && (
        <p className={`text-red-500 text-sm mt-1 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
          {errors?.message?.message}
        </p>
      )}
      {isError && error && (
        <p className={`text-red-500 text-sm mt-1 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
          {error?.message || "something went wrong please try again"}
        </p>
      )}
      {isSuccess && (
        <p className={`text-green-500 text-sm mt-1 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
          {"sent success"}
        </p>
      )}

      {/* Button */}
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

export default ContactForm;