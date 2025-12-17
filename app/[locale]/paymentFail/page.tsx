"use client";

import { useEffect } from "react";
import { XCircle } from "lucide-react";
import MainLink from "@/components/reusableComponent/MainLink";
import { useTranslations } from "next-intl";

export default function PaymentFail() {
  const t = useTranslations("paymentFail");

  useEffect(() => {
    console.log("Payment Failed Page Loaded");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">

        {/* Icon */}
        <XCircle className="w-28 h-28 text-red-600 mx-auto" />

        {/* Title */}
        <h1 className="text-2xl font-bold">{t("title")}</h1>

        {/* Description */}
        <p className="text-white max-w-md mx-auto">{t("description")}</p>

        {/* Back to home */}
        <MainLink href="/" styleMe>
          {t("backHome")}
        </MainLink>

      </div>
    </div>
  );
}
