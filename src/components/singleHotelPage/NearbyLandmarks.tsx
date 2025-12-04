import Image from "next/image";
import Container from "../reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import location from "@/public/loacation.svg";
import defaultimg from "@/public/defaultimg.webp";

const NearbyLandmarks = async ({ data }: any) => {
  const t = await getTranslations("NearbyLandmarks");
  return (
    <Container>
      <div className="flex flex-col gap-5">
        <span className="text-white text-[24px] font-medium">
          {t("near_places")}
        </span>
        <span className="text-white text-[20px] font-normal ">
          <span className="text-white text-[14px] lg:text-[20px]">
            {t("nearest_landmarks")}
          </span>
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.map((item, index) => (
            <div key={item?.id} className="flex flex-col gap-3">
              <div className="aspect-[1/1] rounded-[20px] overflow-hidden max-h-[220px] sm:max-h-[290px] md:max-h-[320px] lg:max-h-[290px]">
                <Image
                  src={item?.image?.original_url || defaultimg}
                  alt="tower"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex flex-col gap-4 w-full justify-between">
                <span className="text-white md:text-lg text-base mb-1 md:mb-2 rtl:text-right ltr:text-left line-clamp-1">
                  {item?.name}
                </span>
                <div className=" flex items-center gap-2">
                  {/* <span className="text-gold">icon</span> */}
                  <Image
                    src={location}
                    alt="tower"
                    width={50}
                    height={50}
                    className="object-cover w-3 "
                  />
                  <span className="text-white/80 md:text-sm text-xs">
                    {item?.dimension}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default NearbyLandmarks;
