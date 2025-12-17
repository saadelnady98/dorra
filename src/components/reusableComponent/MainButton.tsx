"use client";

interface MainLinkProps {
  children: React.ReactNode;
  className?: string;
  styleMe?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
 }

const MainButton = (params: MainLinkProps) => {

  const { children, className, onClick } = params;


  return (
    <button
      onClick={onClick ? onClick : () => {}}
      className={`inline-block font-bold ${className} ${
        params?.styleMe
          ? "inline-flex items-center max-lg:text-[16px] justify-center h-[48px] px-5 lg:px-9 bg-white text-[#CAB16C] rounded-[40px] hover:bg-[#CAB16C] hover:text-white transition-colors"
          : ""
      } `}
      type={params?.type ? params?.type : "button"}
     >
      {children}
    </button>
  );

};

export default MainButton;
