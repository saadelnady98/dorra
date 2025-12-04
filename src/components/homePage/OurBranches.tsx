import React from "react";
import Image from "next/image";
import Container from "@/components/reusableComponent/Container";
import MainLink from "@/components/reusableComponent/MainLink";
import card from "@/public/card.webp";
import SectionTitle from "@/components/reusableComponent/SectionTitle";
import { getTranslations } from "next-intl/server";
import loacation from "@/public/loacation.svg";
import defaultimg from "@/public/defaultimg.webp";

interface BranchProps {
  data: any;
}

const OurBranches = async ({ data }: BranchProps) => {
  const t = await getTranslations("OurBranches");
  return (
    <section className="w-full">
      <Container>
        <div data-aos="fade-up" data-aos-delay="500">
          <SectionTitle
            title={t("our_branches_title")}
            description={t("our_branches_description")}
          />

          {/* Branches Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
            {data?.map((branch, index) => (
              <div
                key={branch?.id}
                className="bg-white bg-opacity-5 border border-white border-opacity-20 rounded-2xl md:rounded-3xl p-2 md:p-4 !pb-0 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-[250px] 2xl:h-[300px] mb-4 md:mb-6">
                  <Image
                    src={branch?.image?.original_url ?? card}
                    alt={"branch"}
                    width={700}
                    height={600}
                    className="object-cover rounded-lg w-full h-full"
                    loading="eager"
                    quality={75}
                    priority={index === 0}
                  />
                </div>

                {/* Content */}
                <div className="px-1 pb-4 md:pb-6">
                  <div>
                    <h3 className="text-white md:text-lg text-base mb-1 md:mb-2 rtl:text-right ltr:text-left line-clamp-1">
                      {branch?.name}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center flex-row gap-2 mb-4 md:mb-6">
                      {/* <FaMapMarkerAlt className="text-primary w-5 h-5 md:w-6 md:h-6" /> */}

                      {/* icon */}
                      <div className="relative ">
                        <Image
                          src={loacation || defaultimg}
                          alt="Shopping Bag"
                          width={12}
                          height={12}
                          className="object-contain w-full h-full"
                          unoptimized
                        />
                      </div>

                      {/* <p className="text-white flex items-center text-sm md:text-base line-clamp-2 md:h-[50px]">
                        {branch?.address}
                      </p> */}
                      <div className="overflow-y-auto flex items-center h-fit hidden-scrollbar">
                        <p className="text-white/80 md:text-sm text-xs ">
                          {branch?.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Button */}
                  <MainLink
                    href={`/hotels/${branch?.slug}`}
                    className="w-full mt-auto !text-[#CAB16C] bg-[#CAB16C] bg-opacity-15 hover:bg-opacity-25 text-primary rounded-full py-2.5 md:py-3 text-sm md:text-base transition-all text-center"
                  >
                    {t("show_details")}
                  </MainLink>
                </div>
              </div>
            ))}
          </div>
          {/* Button */}
          <div className="mt-7 lg:mt-10 w-full flex items-center justify-center ">
            {/* <button className="bg-white text-primary-400 px-8 py-3 rounded-full text-sm lg:text-base hover:bg-primary-50 transition-colors w-[134px] h-[45px] lg:w-auto lg:h-auto">
              {t('cta')}
            </button> */}
            <MainLink href="/hotels" styleMe>
              {t("show_All")}
            </MainLink>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OurBranches;
