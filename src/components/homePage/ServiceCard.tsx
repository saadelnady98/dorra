import Image from "next/image";
import header from "@/public/header.webp";

import MainLink from "../reusableComponent/MainLink";

type ServiceCardProps = {
  service: {
    id: number | string;
    name: string;
    description: string;
    image?: {
      original_url?: string;
    };
  };
};

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <MainLink
      href={`/services/${service?.slug}`}
      key={service.id}
      className="relative w-full h-[320px] rounded-[24px] overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src={service?.image?.original_url ?? header}
        alt={service.name || "Service image"}
        width={600}
        height={500}
        loading="eager"
        quality={75}
        className="object-cover w-full h-full"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#100F0D] via-transparent to-transparent" />

      {/* White Border */}
      <div className="absolute inset-0 border border-white/20 rounded-[24px]" />

      {/* Content */}
      <div className="absolute bottom-0 ltr:left-0 rtl:right-0 p-[14px]">
        <h3 className="text-white  md:text-lg text-base mb-1 line-clamp-2">
          {service.name}
        </h3>
        <p className="text-white/80 xl:text-base md:text-sm text-xs mt-2 font-light leading-[18px] line-clamp-2">
          {service.description}
        </p>
      </div>
    </MainLink>
  );
};

export default ServiceCard;
