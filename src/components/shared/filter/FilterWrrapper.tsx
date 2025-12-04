import Container from "@/components/reusableComponent/Container";
import React, { ReactNode } from "react";

const FilterWrrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Container className="!py-0">
      <div
        className=" rounded-[24px] px-6  py-7 border-[.5px] border-[#FFFFFF33] relative z-10"
        data-aos="fade-down"
        data-aos-delay="500"
      >
        {children}
      </div>
    </Container>
  );
};

export default FilterWrrapper;
