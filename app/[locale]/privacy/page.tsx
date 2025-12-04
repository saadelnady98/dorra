import Banner from "@/components/reusableComponent/Banner";
import Container from "@/components/reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import pic1 from "@/public/card.webp";
import { getPrivacyData } from "@/lib/serverActions";
import { Metadata } from "next";


export async function generateMetadata({ params }: any): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("privacy.title"),
    description: t("privacy.description"),
    keywords: [
      t("privacy.privacy_policy"),
      t("privacy.data_protection"),
      t("privacy.personal_information"),
      t("privacy.Durrat_Tayba_privacy"),
    ],
  };
}

export default async function Page({ params }: any) {
  const { locale } = await params;
  const t = await getTranslations("privacy");

  const data = await getPrivacyData(locale);

  return (
    <Container className="!pt-0">
      {/* <Banner img={data?.data?.header?.image?.original_url} title={t("title")} description={data?.data?.header?.text} /> */}
      <Banner
        img={data?.data?.header?.image?.original_url || pic1}
        title={t("title")}
        description={data?.data?.header?.description}
      />

      <div className="mt-[100px] text-white">
        <p>{data?.data?.data?.text}</p>
        <p className="mt-5">{data?.data?.data?.info}</p>
      </div>
    </Container>
  );
}
