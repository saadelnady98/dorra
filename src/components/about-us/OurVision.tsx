import img2 from "@/public/Bag.svg";
import Image from "next/image";

import title from "@/public/title.svg";
import SectionTitle from "../reusableComponent/SectionTitle";

const OurVision = ({ data, className }: { data: any; className?: string }) => {
  const Blocks = [
    {
      id: 1,
      title: "Our Vision",
      description:
        "  We seek to be the first choice for travelers looking for luxury and comfort by providing an unforgettable accommodation experience that blends luxury and authentic Arab hospitality We focus on providing everything new in the world of hospitality while preserving the traditions that distinguish us Which makes visitors stay at Durrat Taibah a unique and unforgettable experience",
    },
    {
      id: 2,
      title: "Our message",
      description:
        "We are committed to providing an exceptional level of hospitality characterized by innovation and excellence, as we work to provide a sophisticated accommodation environment that combines luxury and comfort in every detail. Every step we take aims to provide a personalized experience that adds a personal touch to your stay, taking into account the smallest details that reflect the professionalism of our staff and our concern for the comfort of our guests.",
    },
  ];
  return (
    <div
      className={`mx-auto mb-[100px] ${className || ""}`}
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data?.map((item) => (
          <div
            key={item?.id}
            className="bg-[#1C1B19] flex flex-col items-center text-center
                border border-[#494947] rounded-[24px] px-[22px] py-[24px]"
          >
            <SectionTitle className="!mb-0" title={item?.title} />
            {/* <Image
                src={title}
                className="lg:w-[64px] lg:h-[13px] w-[42px] h-[9px]"
                alt="img2"
              />
              <span className="text-[#CAB16C] lg:py-[16px] lg:text-[24px] lg:font-medium py-[8px] text-[16px] font-normal">
                {item.title}
              </span> */}
            <span className="lg:text-[18px] lg:font-light line-clamp-4 text-[12px] font-light">
              {item?.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OurVision;
