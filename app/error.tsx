"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import MainLink from "@/components/reusableComponent/MainLink";
import errorImage from "@/public/error.svg";
import ErrorComponent from "@/components/shared/ErrorComponent";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const locale = params?.locale || "en"; // Default to Arabic if no locale found

  useEffect(() => {
    // Log the error to your error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <ErrorComponent
          title={locale === "ar" ? "حدث خطأ" : "Something went wrong"}
          des={
            locale === "ar"
              ? "عذراً، حدث خطأ ما. يرجى المحاولة مرة أخرى"
              : "Sorry, an error occurred. Please try again."
          }
          img={errorImage}
        />

        <MainLink href="/" styleMe>
          {locale === "ar" ? "العودة للرئيسية" : "Back to Home"}
        </MainLink>
      </div>
    </div>
  );
}
