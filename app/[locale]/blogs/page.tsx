import Banner from "@/components/reusableComponent/Banner";
import Container from "@/components/reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import { getBlogData } from "@/lib/serverActions";
import BlogsSection from "@/components/homePage/BlogsSection";
import defaultimg from "@/public/defaultimg.webp";

import { Icon } from "@iconify/react";
import Image from "next/image";
import SectionTitle from "@/components/reusableComponent/SectionTitle";
import MainLink from "@/components/reusableComponent/MainLink";
import Link from "next/link";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("blogs.title"),
    description: t("blogs.description"),
    keywords: [
      t("blogs.blog"),
      t("blogs.blogs"),
      t("blogs.hospitality_news"),
      t("blogs.Durrat_Tayba_insights"),
      t("blogs.hotel_management_tips"),
    ],
  };
}

export default async function Page({ params }: any) {
  const { locale } = await params;
  const t = await getTranslations("blog");

  const data = await getBlogData(locale);

  return (
    <Container className="!pt-0">
      {/* <Banner img={data?.data?.header?.image?.original_url} title={t("title")} description={data?.data?.header?.text} /> */}
      <Banner
        img={
          data?.data?.header?.image?.original_url || data?.data?.header?.image
        }
        title={t("title")}
        description={data?.data?.header?.description}
      />

      <BlogsSection
        className="[&_.container]:!px-0"
        withoutHeaderDescription
        withoutShowMore
        data={data?.data?.topviewed}
      />

      <div data-aos="fade-up" data-aos-duration="1000">
        <SectionTitle title={t("all_blogs")} className="!mb-[32px]" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {data?.data?.data?.map((blog) => (
            <div className="relative w-full  h-full group" key={blog?.id}>
              <div className=" inset-0 bg-white/5 border border-white/20 rounded-[24px] h-fit 2xl:h-full">
                <div className="p-4 flex flex-col-reverse lg:flex-row h-full">
                  {/* Blog Content */}
                  <div className="flex flex-col flex-1 justify-around ml-4 2xl:ml-6">
                    <h3 className="text-white min-h-14 md:text-lg text-base mb-1 md:mb-2 line-clamp-2">
                      {blog?.title}
                    </h3>
                    {/* <p className="text-white text-sm leading-6 mb-4 line-clamp-4">
                    {blog?.description}
                  </p> */}
                    <p
                      className="mb-4 line-clamp-2 text-white/80 md:text-sm text-xs"
                      dangerouslySetInnerHTML={{ __html: blog?.description }}
                    />
                    <div className="flex items-center justify-start ">
                      <MainLink
                        href={`/blogs/${blog?.slug}`}
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
                  {/* Blog Image */}
                  <MainLink
                    href={`/blogs/${blog?.slug}`}
                    className="relative max-sm:w-full min-w-[200px] lg:w-[200px] 2xl:w-[250px] min-h-[200px] lg:h-full shrink-0 max-lg:mb-6"
                  >
                    <Image
                      src={blog?.image?.original_url || defaultimg}
                      alt="Blog"
                      className="object-cover rounded-[24px] border border-white/20"
                      fill
                    />
                  </MainLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="mt-[100px]">
        <p>{data?.data?.text}</p>
        <p className="mt-5">{data?.data?.info}</p>
      </div> */}
    </Container>
  );
}
