import Image from "next/image";
import Container from "../reusableComponent/Container";
import trueIcon from "@/public/trueIcon.svg";
import { getTranslations } from "next-intl/server";
import defaultimg from "@/public/defaultimg.png";

const AboutSingleHotel = async ({ data }: any) => {
  const t = await getTranslations("SingleHotelPage");
  return (
    <Container>
      <div className="flex flex-col gap-5">
        <span className="text-white text-[16px] lg:text-[24px] font-medium">
          {t("about_hotel")}
        </span>
        <div className="flex flex-col gap-4">
          <span className="text-white text-[14px] lg:text-[20px] font-normal">
            {t("description")}
          </span>
          <p className="text-[12px] lg:text-[18px] text-white font-light">
            {data?.description}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-white text-[14px] lg:text-[20px]">
            {t("facilities_and_services")}
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* services */}
            {data?.services?.map((item: any) => (
              <div key={item?.id} className="flex flex-col gap-3">
                {/* category */}
                <div className="flex items-center gap-4">
                  <Image
                    src={item?.image?.original_url || defaultimg}
                    width={50}
                    height={50}
                    alt="icon"
                    className="w-5 h-5"
                  />
                  <span className="text-gold text-[14px] lg:text-[18px] font-normal text-[#CAB16C]">
                    {item?.category}
                  </span>
                </div>
                {/* sub services */}
                <div className="space-y-3">
                  {" "}
                  {item?.services?.map((subService: any) => (
                    <div
                      key={subService?.id}
                      className="flex items-center gap-4"
                    >
                      <Image
                        src={trueIcon}
                        width={50}
                        height={50}
                        alt="icon"
                        className="w-5 h-5"
                      />
                      <span className="text-gold text-sm font-normal ">
                        {subService?.service_name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};
export default AboutSingleHotel;
