import defaultImg from "@/public/defaultimg.webp";
import Image from "next/image";
import SectionTitle from "../reusableComponent/SectionTitle";

const OurValues = ({ data, className }: { data: any; className?: string }) => {
  

  return (
    <div
      className={`mx-auto flex flex-col justify-center items-center mb-[100px] ${
        className || ""
      }`}
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <SectionTitle
        className="[&_.description]:text-lg [&_.description]:font-light"
        title={data?.title}
        description={data?.description}
      />

    

      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {data?.values?.map((item: any) => (
          <div
            key={item.id}
            className="bg-[#1C1B19] flex flex-col items-center lg:items-start text-center border
                 border-[#494947] rounded-[24px] px-[22px] py-[24px]"
          >
            <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-3">
              <div className="w-[48px] h-[48px] lg:w-[56px] lg:h-[56px] rounded-[8px] bg-[#FFFFFF1A] flex items-center justify-center">
                <Image
                  src={item?.image?.original_url || defaultImg}
                  width={50}
                  height={50}
                  alt="img.map"
                  className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px] "
                />
              </div>
              <span className="text-white capitalize lg:text-[18px] lg:font-medium text-[16px] font-medium">
                {" "}
                {item?.name}
              </span>
            </div>
            <p className="text-center lg:text-start mt-3   text-[12px] font-light lg:text-[16px] lg:font-light">
              {item?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OurValues;
