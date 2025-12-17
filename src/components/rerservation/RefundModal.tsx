"use client";

import Image from "next/image";
import warning from "@/public/cancel-calendar.svg";  
import defaultimg from "@/public/defaultimg.webp";
import { useTranslations } from "next-intl";

interface RefundModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const RefundModal = ({ open, onClose, onConfirm }: RefundModalProps) => {
  const t = useTranslations("Reservations");

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[100] backdrop-blur-xl flex items-center justify-center
        ${open ? "bg-black/50" : "hidden"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          p-7
          max-w-[600px]
          flex flex-col bg-[#1C1B19] rounded-[32px]
          justify-center items-center gap-4
          transition-all duration-300
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <Image
          src={warning || defaultimg}
          alt="warning"
          width={100}
          height={120}
          className="w-[85px] h-[121px]"
        />

        <span className="text-white text-[24px] font-medium">
          {t("cancel_reservation")}
        </span>

        <div className="  bg-white/5 border border-white/10 rounded-2xl p-4 ">
          <h3 className="text-[#CAB16C] font-semibold text-[20px] mb-3">
            {t("refund_policy_title")}
          </h3>

          <ul className="list-disc list-inside text-white/80 space-y-4 text-[18px]">
            <li>{t("refund_policy_one_day_before")}</li>
            <li>{t("refund_policy_one_night")}</li>
          </ul>
        </div>

        <div className="flex gap-5">
          <button
            onClick={onClose}
            className="text-gold border hover:bg-gradient-to-t from-[#99803B] to-gold
              hover:text-white duration-300 rounded-3xl py-[12px] px-[45px]"
          >
            {t("cancel")}
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-500 text-white rounded-3xl py-[12px] px-[45px]"
          >
            {t("confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundModal;
