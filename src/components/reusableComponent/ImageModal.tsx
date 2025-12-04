import React from "react";
import { Icon } from "@iconify/react";
import ImageSlider from "../singleHotelPage/ImageSlider";
import pic1 from "@/public/card.webp";
import pic2 from "@/public/card.webp";
import pic3 from "@/public/card.webp";
import pic4 from "@/public/card.webp";
import pic5 from "@/public/card.webp";

interface ImageModalProps {
  images: any[];
  onClose: () => void;
  className?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  images,
  onClose,
  className = "",
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-[99]">
      <div className={`relative w-full max-w-5xl mx-auto px-4 ${className}`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-[25px] z-50 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all"
          aria-label="Close"
        >
          <Icon icon="mdi:close" className="text-2xl" />
        </button>
        <ImageSlider
          images={
            images?.map((img: any) => img?.original_url || pic1) || [pic1]
          }
        />
      </div>
    </div>
  );
};

export default ImageModal;
