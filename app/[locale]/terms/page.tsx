import Banner from "@/components/reusableComponent/Banner";
import Container from "@/components/reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import pic1 from "@/public/card.webp";
import { getTermsData } from "@/lib/serverActions";

export async function generateMetadata() {
  const t = await getTranslations("meta");
  return {
    title: t("terms.title"),
    description: t("terms.description"),
    keywords: [
      t("terms.terms_of_service"),
      t("terms.website_terms"),
      t("terms.Durrat_Tayba_terms"),
      t("terms.conditions_of_use"),
    ],
  };
}

export default async function Page({ params }: any) {
  const { locale } = await params;
  const t = await getTranslations("terms");

  const data = await getTermsData(locale);

  return (
    <Container className="!pt-0">
      {/* <Banner img={data?.data?.header?.image?.original_url} title={t("title")} description={data?.data?.header?.text} /> */}
      <Banner
        img={data?.data?.header?.image?.original_url || pic1}
        title={t("title")}
        description={data?.data?.header?.description}
      />
      <div className="mt-[100px]">
        <p>{data?.data?.data?.text}</p>
        <p className="mt-5">{data?.data?.data?.info}</p>
      </div>
    </Container>
  );
}
