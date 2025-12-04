import Banner from "@/components/reusableComponent/Banner";
import Container from "@/components/reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import { getServicesData, getSingleBlogData } from "@/lib/serverActions";
import HomeSlider from "@/components/homePage/HomeSlider";
import defaultimg from "@/public/defaultimg.png";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { locale, slug } = await params;
  const singleBlog = await getSingleBlogData(slug, locale);
  return {
    title: singleBlog?.data?.title,
    description: singleBlog?.data?.description,
    openGraph: {
      images: [
        {
          url: singleBlog?.data?.image?.original_url,
        },
      ],
    },
  };
}

export default async function Page({ params }: any) {
  const { locale, slug } = await params;
  const t = await getTranslations("services");

  const data = await getSingleBlogData(slug, locale);


  return (
    <Container className="!pt-[100px]">
      {/* {data?.data?.images?.length === 1 && (
        <Banner
          img={data?.data?.images?.[0]?.original_url|| defaultimg}
          title={""}
          description={""}
          withoutShadow
        />
      )}
      {data?.data?.images?.length > 1 && (
        <HomeSlider imagesOnly data={data?.data} />
      )} */}

      <div>
        <span className="text-base font-light mb-4">{data?.data?.date}</span>
        <h3 className="text-[18px] lg:text-[40px] lg:font-medium">
          {data?.data?.title}
        </h3>
      </div>

      <Banner
        // img={data?.data?.images?.[0]?.original_url || defaultimg}
        img={data?.data?.image?.original_url || defaultimg}
        title={""}
        description={""}
        classNameWrapper="!pt-[30px]"
        withoutShadow
      />

      <div className="mt-[35px]">
        <p dangerouslySetInnerHTML={{ __html: data?.data?.description }} />
      </div>
    </Container>
  );
}
