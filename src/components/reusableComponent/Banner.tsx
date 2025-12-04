import Image from "next/image";
import defaultimg from "@/public/defaultimg.png";
interface BannerProps {
  img: any;
  title?: string;
  description?: string;
  withoutShadow?: boolean;
  className?: string;
  classNameWrapper?: string;
}

const Banner = ({
  img,
  title,
  description,
  withoutShadow,
  className,
  classNameWrapper,
}: BannerProps) => {
  return (
    <div
      className={`flex justify-center pt-28 w-full ${
        classNameWrapper && classNameWrapper
      }`}
    >
      <div
        className={`relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[550px] overflow-hidden rounded-[32px] ${
          className && className
        }`}
      >
        {" "}
        <div
          className={`absolute top-0 right-0 left-0 bottom-0 ${
            withoutShadow ? "" : "bg-black opacity-50"
          } `}
        />
        <Image
          src={img || defaultimg}
          alt=""
          width={1200}
          height={1000}
          className="w-full h-full object-cover rounded-lg"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center  rounded-lg"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <h2 className="text-white text-[35px] md:text-[48px] text-center md:text-start font-medium">{title}</h2>
          <p className="max-w-[550px] text-white text-[20px] font-light text-center mt-4 w-200">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Banner;
