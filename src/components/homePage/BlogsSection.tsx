import React from "react";
import Image from "next/image";
import Container from "@/components/reusableComponent/Container";
import MainLink from "@/components/reusableComponent/MainLink";
import { Icon } from "@iconify/react";
import SectionTitle from "@/components/reusableComponent/SectionTitle";
import { getTranslations } from "next-intl/server";
import cardFallBackImg from "@/public/card.webp";
import { cn } from "@/lib/utils";

interface BlogsSectionProps {
  data: any;
  withoutShowMore?: boolean;
  withoutHeaderDescription?: boolean;
  className?: string;
}

const BlogsSection = async ({
  data,
  withoutShowMore,
  withoutHeaderDescription,
  className,
}: BlogsSectionProps) => {
  const t = await getTranslations("BlogsSection");
  return (
    <section className={cn("w-full", className)}>
      <Container>
        <div data-aos="fade-up" data-aos-delay="500">
          <SectionTitle
            title={t("Blogs_section_title")}
            description={
              withoutHeaderDescription ? null : t("Blogs_section_description")
            }
          />

          {/* Blogs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 2xl:gap-7 mt-10">
            {data?.length > 2 && (
              <>
                {/* Large Blog Card */}
                <div className="relative w-full h-full  group">
                  <div className=" inset-0 bg-white/5 border border-white/20 rounded-[24px] lg:h-full">
                    <div className="p-4 flex flex-col h-full">
                      {/* Blog Image */}
                      <div className="relative w-full min-h-[200px] lg:h-full mb-6">
                        <Image
                          src={
                            data?.[0]?.image?.original_url ?? cardFallBackImg
                          }
                          alt="Blog"
                          className="object-cover rounded-[24px] border border-white/20"
                          width={600}
                          height={600}
                          quality={75}
                        />
                      </div>

                      {/* Blog Content */}
                      <div className="flex flex-col">
                        <h3 className="text-white text-2xl mb-4 line-clamp-2">
                          {data?.[0]?.title}
                        </h3>
                        {/* <p className="text-white text-base leading-6 mb-4 line-clamp-2">
                          {data?.[0]?.description}
                        </p> */}
                        <div
                          className="mb-4 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: data?.[0]?.description,
                          }}
                        />
                        <div className="flex items-center justify-start mt-auto">
                          <MainLink
                            href={`/blogs/${data?.[0]?.slug}`}
                            className="text-[#CAB16C] text-lg"
                          >
                            {t("show_details")}
                          </MainLink>
                          <Icon
                            icon="material-symbols:arrow-back-rounded"
                            className="text-[#CAB16C] text-2xl ltr:rotate-180"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Small Blog Cards Container */}
                <div className="flex flex-col gap-5 2xl:gap-7">
                  {/* Small Blog Card 1 */}
                  <div className="relative w-full  h-full group">
                    <div className=" inset-0 bg-white/5 border border-white/20 rounded-[24px] h-fit 2xl:h-full">
                      <div className="p-4 flex flex-col-reverse lg:flex-row h-full">
                        {/* Blog Content */}
                        <div className="flex flex-col flex-1 justify-around ml-4 2xl:ml-6">
                          <h3 className="text-white text-xl mb-3 line-clamp-2">
                            {data?.[1]?.title}
                          </h3>
                          {/* <p className="text-white text-sm leading-6 mb-4 line-clamp-2">
                            {data?.[1]?.description}
                          </p> */}
                          <p
                            className="mb-4 line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: data?.[1]?.description,
                            }}
                          />

                          <div className="flex items-center justify-start ">
                            <MainLink
                              href={`/blogs/${data?.[1]?.slug}`}
                              className="text-[#CAB16C] text-lg"
                            >
                              {t("show_details")}
                            </MainLink>
                            <Icon
                              icon="material-symbols:arrow-back-rounded"
                              className="text-[#CAB16C] text-2xl ltr:rotate-180"
                            />
                          </div>
                        </div>
                        {/* Blog Image */}
                        <div className="relative max-sm:w-full min-w-[200px] lg:w-[200px] 2xl:w-[250px] min-h-[200px] lg:h-full shrink-0 max-lg:mb-6">
                          <Image
                            src={
                              data?.[1]?.image?.original_url ?? cardFallBackImg
                            }
                            alt="Blog"
                            className="object-cover rounded-[24px] border border-white/20"
                            fill
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative w-full  h-full group">
                    <div className=" inset-0 bg-white/5 border border-white/20 rounded-[24px] h-fit 2xl:h-full">
                      <div className="p-4 flex flex-col-reverse lg:flex-row h-full">
                        {/* Blog Content */}
                        <div className="flex flex-col flex-1 justify-around ml-4 2xl:ml-6">
                          <h3 className="text-white text-xl mb-3 line-clamp-2">
                            {data?.[2]?.title}
                          </h3>
                          {/* <p className="text-white text-sm leading-6 mb-4 line-clamp-2">
                            {data?.[2]?.description}
                          </p> */}
                          <p
                            className="mb-4 line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: data?.[2]?.description,
                            }}
                          />
                          <div className="flex items-center justify-start ">
                            <MainLink
                              href={`/blogs/${data?.[2]?.slug}`}
                              className="text-[#CAB16C] text-lg"
                            >
                              {t("show_details")}
                            </MainLink>
                            <Icon
                              icon="material-symbols:arrow-back-rounded"
                              className="text-[#CAB16C] text-2xl ltr:rotate-180"
                            />
                          </div>
                        </div>
                        {/* Blog Image */}
                        <div className="relative max-sm:w-full min-w-[200px] lg:w-[200px] 2xl:w-[250px] min-h-[200px] lg:h-full shrink-0 max-lg:mb-6">
                          <Image
                            src={
                              data?.[2]?.image?.original_url ?? cardFallBackImg
                            }
                            alt="Blog"
                            className="object-cover rounded-[24px] border border-white/20"
                            fill
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Small Blog Card 2 */}
                </div>
              </>
            )}

            {data?.length === 2 &&
              data?.map((item, index) => (
                <div key={index} className="relative w-full h-fit group">
                  <div className=" inset-0 bg-white/5 border border-white/20 rounded-[24px] lg:h-full">
                    <div className="p-4 flex flex-col h-full">
                      {/* Blog Image */}
                      <MainLink
                        href={`/blogs/${item?.slug}`}
                        className="relative w-full min-h-[200px] lg:h-full mb-6"
                      >
                        <Image
                          src={item?.image?.original_url ?? cardFallBackImg}
                          alt="Blog"
                          className="object-cover h-[353px] rounded-[24px] border border-white/20"
                          width={656}
                          height={353}
                        />
                      </MainLink>

                      {/* Blog Content */}
                      <div className="flex flex-col">
                        <h3 className="text-white min-h-14 md:text-lg text-base mb-1 md:mb-2 line-clamp-2">
                          {item?.title}
                        </h3>
                        {/* <p className="text-white text-base leading-6 mb-4 line-clamp-2">
                          {item?.description}
                        </p> */}
                        <div
                          className="mb-4 line-clamp-2 text-white/80 md:text-sm text-xs"
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        />

                        <div className="flex items-center justify-start mt-auto">
                          <MainLink
                            href={`/blogs/${item?.slug}`}
                            className="relative text-[#CAB16C] text-lg after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:bg-[#CAB16C]  after:h-[1px] hover:after:w-full transition-all duration-500 ease-in-out"
                          >
                            {t("show_details")}
                          </MainLink>
                          <Icon
                            icon="material-symbols:arrow-back-rounded"
                            className="text-[#CAB16C] text-2xl ltr:rotate-180"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {data?.length === 1 && (
            <div className="grid grid-cols-1 gap-5 2xl:gap-7 mt-10">
              <div className="relative w-full h-fit group">
                <div className=" inset-0 bg-white/5 border border-white/20 rounded-[24px] lg:h-full">
                  <div className="p-4 flex flex-col h-full">
                    {/* Blog Image */}
                    <MainLink
                      href={`/blogs/${data?.[0]?.slug}`}
                      className="relative w-full min-h-[200px] lg:h-full mb-6"
                    >
                      <Image
                        src={data?.[0]?.image?.original_url ?? cardFallBackImg}
                        alt="Blog"
                        className="object-cover h-[353px] rounded-[24px] border border-white/20"
                        width={656}
                        height={353}
                      />
                    </MainLink>

                    {/* Blog Content */}
                    <div className="flex flex-col">
                      <h3 className="text-white min-h-14 md:text-lg text-base mb-1 md:mb-2 line-clamp-2">
                        {data?.[0]?.title}
                      </h3>
                      {/* <p className="text-white text-base leading-6 mb-4 line-clamp-2">
                        {data?.[0]?.description}
                      </p> */}
                      <div
                        className="mb-4 line-clamp-2 text-white/80 md:text-sm text-xs"
                        dangerouslySetInnerHTML={{
                          __html: data?.[0]?.description,
                        }}
                      />
                      <div className="flex items-center justify-start mt-auto">
                        <MainLink
                          href={`/blogs/${data?.[0]?.slug}`}
                          className="relative text-[#CAB16C] text-lg after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:bg-[#CAB16C]  after:h-[1px] hover:after:w-full transition-all duration-500 ease-in-out"
                        >
                          {t("show_details")}
                        </MainLink>
                        <Icon
                          icon="material-symbols:arrow-back-rounded"
                          className="text-[#CAB16C] text-2xl ltr:rotate-180"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Button */}
          <div className="mt-7 lg:mt-10 w-full flex items-center justify-center ">
            {/* <button className="bg-white text-primary-400 px-8 py-3 rounded-full text-sm lg:text-base hover:bg-primary-50 transition-colors w-[134px] h-[45px] lg:w-auto lg:h-auto">
              {t('cta')}
            </button> */}
            {!withoutShowMore && (
              <MainLink href="/blogs" styleMe>
                {t("show_All")}
              </MainLink>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BlogsSection;
