"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import MainButton from "@/components/reusableComponent/MainButton";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function OtpModal({ open, onOpenChange, onVerify }: any) {
  const t = useTranslations("Reservations");
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify?.(otp);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          bg-white/5 
          backdrop-blur-xl
          border border-[#FFFFFF33]
          rounded-3xl 
           max-w-[420px]
          text-white
          "
      >
        <div className="otpModal">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold text-white mb-4">
              {t("enter_otp")}
            </DialogTitle>
          </DialogHeader>

          <p className="text-center text-white/60  ">
            {t("otp_sent_message")}
          </p>

          {/* OTP INPUT */}
          <div className="flex justify-center  mt-5 " dir="ltr">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              className="flex gap-2"
            >
              <InputOTPGroup className="flex gap-2">
                <InputOTPSlot
                  index={0}
                  className="bg-white/10 text-white border-white/20   otpButton"
                />
                <InputOTPSlot
                  index={1}
                  className="bg-white/10 text-white border-white/20  otpButton"
                />
                <InputOTPSlot
                  index={2}
                  className="bg-white/10 text-white border-white/20  otpButton"
                />
              </InputOTPGroup>

              <InputOTPSeparator className="text-white/40" />

              <InputOTPGroup className="flex gap-2">
                <InputOTPSlot
                  index={3}
                  className="bg-white/10 text-white border-white/20  otpButton"
                />
                <InputOTPSlot
                  index={4}
                  className="bg-white/10 text-white border-white/20  otpButton"
                />
                <InputOTPSlot
                  index={5}
                  className="bg-white/10 text-white border-white/20  otpButton"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
        {/* VERIFY BTN */}
        <MainButton className="w-full " styleMe onClick={handleVerify}>
          {t("verify")}
        </MainButton>
      </DialogContent>
    </Dialog>
  );
}
