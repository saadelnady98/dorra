import React, { ReactNode } from "react";
type CustomButtonProps = {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};
const CustomButton = (props: CustomButtonProps) => {
  return (
    <button
      onClick={() => props.onClick && props.onClick()}
      className={`bg-primary w-full text-white text-center px-[50px] py-3 rounded-full  ${
        props.className && props.className
      }`}
    >
      {props.children}
    </button>
  );
};

export default CustomButton;