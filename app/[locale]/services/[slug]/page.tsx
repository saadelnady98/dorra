import Banner from "@/components/reusableComponent/Banner";
import Container from "@/components/reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import { getServicesData, getSingleServiceData } from "@/lib/serverActions";
import HomeSlider from "@/components/homePage/HomeSlider";
import { Metadata } from "next";
type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;  
  const data = await getSingleServiceData(slug, locale);

  return {
    title: data?.data?.title,
    description: data?.data?.description,
    openGraph: {
      images: [
        {
          url: data?.data?.images?.[0]?.original_url,
        },
      ],
    },
  };
}
export default async function Page({ params }: any) {
  const { locale, slug } = await params;
  const t = await getTranslations("services");

  const data = await getSingleServiceData(slug, locale);

  return (
    <Container className="!pt-0">
      {/* <Banner img={data?.data?.header?.image?.original_url} title={t("title")} description={data?.data?.header?.text} /> */}
      {data?.data?.images?.length === 1 && (
        <Banner
          img={data?.data?.images?.[0]?.original_url}
          title={""}
          description={""}
          withoutShadow
        />
      )}
      {data?.data?.images?.length > 1 && (
        <HomeSlider imagesOnly data={data?.data} />
      )}

      <div className="mt-[100px]" data-aos="fade-up" data-aos-duration="1000">
        <h3 className="text-[#CAB16C] text-[18px] lg:text-[36px] lg:font-medium">
          {data?.data?.title}
        </h3>
        <p className="text-[11px] font-normal lg:text-[22px] lg:font-light">
          {data?.data?.description}
        </p>
      </div>
    </Container>
  );
}
