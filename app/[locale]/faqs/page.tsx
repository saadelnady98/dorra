import Banner from "@/components/reusableComponent/Banner";
import Container from "@/components/reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import pic1 from "@/public/card.webp";
import FaqsHotel from "@/components/reusableComponent/FaqsHotel";
import { getFaqsData } from "@/lib/serverActions";
import { Metadata } from "next";

export async function generateMetadata(props: any): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("faqs.title"),
    description: t("faqs.description"),
    keywords: [
      t("faqs.FAQs"),
      t("faqs.hotel_management_questions"),
      t("faqs.Durrat_Tayba_help"),
      t("faqs.hospitality_FAQs"),
    ],
  };
}

export default async function Page(props: any) {
  const { locale } = props.params as { locale: string };
  const t = await getTranslations("faqs");

  const data = await getFaqsData(locale);

  return (
    <>
      <Container className="!pt-0">
        {/* <Banner img={data?.data?.header?.image?.original_url} title={t("title")} description={data?.data?.header?.text} /> */}
        <Banner
          img={data?.data?.header?.image?.original_url || pic1}
          title={t("title")}
          description={data?.data?.header?.description}
        />
      </Container>
      <FaqsHotel hiddenTitle data={data?.data?.data} />
    </>
  );
}
