import Container from "@/components/reusableComponent/Container";
import SectionTitle from "@/components/reusableComponent/SectionTitle";
import { getTranslations } from "next-intl/server";
import React from "react";
import { getAboutUsData } from "@/lib/serverActions";
import Banner from "@/components/reusableComponent/Banner";
import OurVision from "@/components/about-us/OurVision";
import OurValues from "@/components/about-us/OurValues";
import Awards from "@/components/about-us/Awards";
import AboutSection from "@/components/homePage/AboutSection";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("about-us-meta.title"),
    description: t("about-us-meta.description"),
    keywords: [
      t("about-us-meta.about_durrat_tayba"),
      t("about-us-meta.hotel_management_experts"),
      t("about-us-meta.Saudi_hospitality"),
      t("about-us-meta.company_profile"),
    ],
  };
}

export default async function Page({ params }: any) {
  const { locale } = await params;
  const t = await getTranslations("about-us");

  const data = await getAboutUsData(locale);

  return (
    <Container className="!pt-0">
      <Banner
        img={data?.data?.header?.image?.original_url}
        title={t("title")}
        description={data?.data?.header?.description}
      />

      <AboutSection className="!mt-[50px]" data={data?.data?.about} noDetails />

      {/* <SectionTitle
        className="!mt-24"
        title={t("title")}
        description={t("description")}
      /> */}

      <OurVision
        data={[
          {
            id: data?.data?.vision?.id,
            title: data?.data?.vision?.title,
            description: data?.data?.vision?.description,
          },
          {
            id: data?.data?.message?.id,
            title: data?.data?.message?.title,
            description: data?.data?.message?.description,
          },
        ]}
        className="!mt-[50px]"
      />

      <OurValues
        data={{
          title: data?.data?.values_description?.title,
          description: data?.data?.values_description?.description,
          values: data?.data?.values,
        }}
        className="!mt-[50px]"
      />
      <Awards
        data={{
          title: data?.data?.achievement_description?.title,
          description: data?.data?.achievement_description?.description,
          achievement: data?.data?.achievement,
        }}
      />
    </Container>
  );
}
