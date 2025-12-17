"use client";

import { X, XCircle, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface PaymentModalProps {
  open: boolean;
  type: "success" | "fail";
  onClose: () => void;
}

export default function PaymentModal({ open, type, onClose }: PaymentModalProps) {
  const t = useTranslations("payment");

  if (!open) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#1a1a1a] rounded-2xl shadow-xl p-6 w-full max-w-md 
                      animate-[fadeIn_0.25s_ease-out]">

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-red-500 transition"
        >
          <X size={28} />
        </button>

        <div className="text-center space-y-4">

          {/* Dynamic Icon */}
          {isSuccess ? (
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          ) : (
            <XCircle className="w-20 h-20 text-red-600 mx-auto" />
          )}

          {/* Dynamic Title */}
          <h1 className="text-2xl font-bold text-white">
            {isSuccess ? t("successTitle") : t("failTitle")}
          </h1>

          {/* Dynamic Description */}
          <p className="text-gray-300 max-w-md mx-auto">
            {isSuccess ? t("successDesc") : t("failDesc")}
          </p>

          {/* Dynamic Button */}
          <button
            onClick={onClose}
            className={`mt-4 inline-block px-5 py-2 rounded-lg font-semibold transition
              ${isSuccess ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"} 
              text-white`}
          >
            {isSuccess ? t("successBtn") : t("failBtn")}
          </button>
        </div>
      </div>
    </div>
  );
}
