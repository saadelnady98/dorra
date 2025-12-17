"use client";

import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import MainLink from "@/components/reusableComponent/MainLink";
import { useTranslations } from "next-intl";

export default function PaymentSuccess() {
  const t = useTranslations("paymentSuccess"); // ← key of translations namespace

  useEffect(() => {
    console.log("Payment Success Page Loaded");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">

        {/* Icon */}
        <CheckCircle className="w-28 h-28 text-green-600 mx-auto" />

        {/* title */}
        <h1 className="text-2xl font-bold">{t("title")}</h1>

        {/* description */}
        <p className="text-white max-w-md mx-auto">{t("description")}</p>

        {/* Back to home */}
        <MainLink href="/" styleMe>
          {t("backHome")}
        </MainLink>

      </div>
    </div>
  );
}
