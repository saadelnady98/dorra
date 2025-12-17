"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "@/components/ui/CustomInput";
import { useTranslations, useLocale } from "next-intl";
import CostumPhoneInput from "@/components/reusableComponent/PhoneInput";
import { useMutation } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";
import CustomTextarea from "../ui/CustomTextarea";
import { toast } from "react-hot-toast";
import { isValidPhoneNumber } from "react-phone-number-input";

const ContactForm = ({
  btnAlignEnd,
  withMessage,
}: {
  btnAlignEnd?: boolean;
  withMessage?: boolean;
}) => {
  const t = useTranslations("ContactUsSection");
  const te = useTranslations("contactErrors");
  const locale = useLocale();

  // BASE SCHEMA
  const baseSchema = z.object({
    firstName: z.string().min(1, te("first_name_required")),
    lastName: z.string().min(1, te("last_name_required")),
    email: z.string().email(te("email_invalid")),

    phone: z
      .string()
      .min(1, t("phone_required"))
      .refine((val) => isValidPhoneNumber(val), {
        message: t("invalid_phone"),
      }),
    message: z.string().min(1, te("message_required")).optional(),
  });

  const withMessageSchema = baseSchema.extend({
    message: z.string().min(1, te("message_required")).optional(),
  });

  const formSchema = withMessage ? withMessageSchema : baseSchema;

  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // 🔥 Mutation with toast notifications
  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      apiServiceCall({
        url: "contacts",
        body: data,
        method: "POST",
        headers: {
          "Accept-Language": locale,
        },
      }),
    onSuccess: () => {
      toast.success(t("sent_success"));
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.errors?.message || t("something_wrong"));
    },
  });

  const onSubmit = (data: any) => {
    const submissionData =
      !withMessage && data.message ? { ...data, message: undefined } : data;

    mutate(submissionData);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {/* Name fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          label={t("first_name")}
          name="firstName"
          register={register}
          error={errors.firstName?.message}
          locale={locale}
        />

        <CustomInput
          label={t("last_name")}
          name="lastName"
          register={register}
          error={errors.lastName?.message}
          locale={locale}
        />
      </div>

      {/* Email */}
      <CustomInput
        label={t("email")}
        name="email"
        type="email"
        register={register}
        error={errors.email?.message}
        locale={locale}
      />

      {/* Phone */}
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
            locale={locale}
            errMessage={errors.phone?.message}
          />
        )}
      />

      {/* Message Textarea */}
      {withMessage && (
        <CustomTextarea
          label={t("message")}
          name="message"
          register={register}
          error={errors?.message?.message}
          locale={locale}
        />
      )}

      {/* Submit Button */}
      <div
        className={`mt-7 lg:mt-10 w-full flex items-center ${
          btnAlignEnd ? "justify-end" : "justify-center"
        }`}
      >
        <button
          className={`inline-block font-bold items-center max-lg:text-[16px] justify-center h-[48px] px-5 lg:px-9 bg-white text-[#CAB16C] rounded-[40px] hover:bg-[#CAB16C] hover:text-white transition-colors ${
            isPending ? "cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isPending}
        >
          {isPending ? t("loading") : t("send")}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
