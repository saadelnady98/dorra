import Image from "next/image";

const ErrorComponent = ({
  title,
  des,
  img,
}: {
  title: string;
  des: string;
  img: any;
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 mb-[50px]">
      <Image
        src={img}
        width={247}
        height={247}
        quality={90}
        alt="img"
        unoptimized
      />
      <p className="text-white text-[32px]">{title}</p>
      <p className="text-gr text-[20px] w-[448px] text-center">{des}</p>
    </div>
  );
};
export default ErrorComponent;
