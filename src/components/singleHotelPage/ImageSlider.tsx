import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import defaultimg from "@/public/defaultimg.webp";

// Image Slider Component
const ImageSlider = ({ images }: { images: string[] }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView={1}
      className="w-full h-full max-h-[800px] rounded-lg custom-swiper"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full flex justify-center bg-black">
            <Image
              src={image || defaultimg}
              alt={`Slide ${index + 1}`}
              width={1000}
              height={800}
              className="object-contain max-h-[80vh]"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
