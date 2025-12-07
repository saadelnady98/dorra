import Image from "next/image";
import SectionTitle from "../reusableComponent/SectionTitle";
import defaultImg from "@/public/defaultimg.webp";

const Awards = ({ data }: { data: any }) => {
  return (
    <div  data-aos="fade-up"
    data-aos-duration="1000">
      <div className="container mx-auto flex flex-col justify-center items-center mb-[100px]">
        <SectionTitle
        className="[&_.description]:text-lg [&_.description]:font-light"
          title={data?.title}
          description={data?.description}
        />

      

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.achievement?.map((item: any) => (
            <div key={item.id} className="flex flex-col items-center">
              <Image
                src={item?.image?.original_url || defaultImg}
                width={164}
                height={164}
                className="w-[164px] h-[164px] lg:w-[176px] lg:h-[176px] object-contain"
                alt="img.map"
              />
              <h1 className="text-center text-[16px] font-light lg:text-[18px] lg:font-light ">
                {item?.description}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Awards;
