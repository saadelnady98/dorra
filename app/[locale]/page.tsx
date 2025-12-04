interface LayoutProps {
  params: Promise<{ locale: string | any }>; // Handle both promise and object
}
import { getTranslations } from "next-intl/server";

import HomeSlider from "@/components/homePage/HomeSlider";
import AboutSection from "@/components/homePage/AboutSection";

import { getFilterHotelsData, getHomeData } from "@/lib/serverActions";
import OurBranches from "@/components/homePage/OurBranches";
import OurServices from "@/components/homePage/OurServices";
import Feedback from "@/components/homePage/Feedback";
import BlogsSection from "@/components/homePage/BlogsSection";

import ContactUsSection from "@/components/homePage/ContactUsSection";
import HomeFilter from "@/components/shared/filter/HomeFilter";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("home.title"),
    description: t("home.description"),
    keywords: [
      t("home.Durrat_Tayba"),
      t("home.hotel_management_Saudi_Arabia"),
      t("home.hospitality"),
      t("home.hotel_services"),
      t("home.Saudi_hotels"),
    ],
  };
}

export default async function Home({ params }: LayoutProps) {
  const { locale } = await params;
  const homeData = await getHomeData(locale);
  // const t = await getTranslations("navigation")
  const data = await getFilterHotelsData(locale);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between pt-28 rtl:text-right ltr:text-left">
        {/* <Test/> */}
        <HomeSlider data={homeData?.data?.slider} />
        <HomeFilter hotels={data?.data} locale={locale} />
        <AboutSection data={homeData?.data?.aboutus} />
        <OurBranches data={homeData?.data?.hotel} />
        <OurServices data={homeData?.data?.services} />
        <Feedback data={homeData?.data?.feedback} />
        <BlogsSection data={homeData?.data?.blogs} />
        <ContactUsSection locale={locale} data={homeData?.data?.contact} />
      </main>
    </>
  );
}
