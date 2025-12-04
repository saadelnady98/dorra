"use client";

import trash from "@/public/trash.svg";
import Image from "next/image";
import defaultimg from "@/public/defaultimg.png";
import { useTranslations } from "next-intl";

interface TrashProps {
  open: boolean;
  close: () => void;
  onDelete: () => void;
}

const Trash = ({ open, close, onDelete }: TrashProps) => {
  const t = useTranslations("trash"); // Namespace "Trash"

  return (
    <div
      onClick={close}
      className={`
        fixed inset-0 z-[100]
        mx-auto backdrop-blur-xl flex justify-center items-center ${
          open ? "block bg-black/50" : "hidden"
        } `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-[400px] h-[400px]
          flex flex-col bg-[#1C1B19] rounded-[32px]
          justify-center items-center gap-4
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <Image
          src={trash || defaultimg}
          alt="trash"
          width={100}
          height={150}
          className="w-[85px] h-[121px]"
        />
        {/* Title */}
        <span className="text-white text-[24px] font-medium">
          {t("deleteRoom")} 
        </span>

        <div className="w-[312px] text-center">
          <p className="text-white text-[16px] font-light ">
            {t("confirmRemoveRoom")}
          </p>
          <p className="text-white text-[16px] font-light">
            {t("cannotRecover")}
          </p>
        </div>

        <div className="flex gap-5">
          <button
            onClick={close}
            className=" text-gold border border-gr
              hover:bg-gradient-to-t from-[#99803B] to-gold
              hover:text-white duration-300
              cursor-pointer rounded-3xl py-[12px] px-[45px]"
          >
            {t("cancel")}
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white
              cursor-pointer rounded-3xl py-[12px] px-[45px]"
          >
            {t("deleteRooms")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trash;
