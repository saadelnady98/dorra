import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import HotelImageGrid from "../reusableComponent/HotelImageGrid";
import pic4 from "@/public/card.png";
import defaultimg from "@/public/defaultimg.png";

// Image Slider Component
const ImageSlider = ({ images }: { images: string[] }) => {
  // return (
  //   <>
  //     <HotelImageGrid
  //       images={images}
  //       // openModal={/* your openModal function here */}
  //       showPhotoText={"Show50photo"}
  //       fallbackImages={{
  //         main: pic4,
  //         others: pic4,
  //       }}
  //     />
  //   </>
  // );
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
