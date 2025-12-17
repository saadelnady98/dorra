interface LayoutProps {
  params: Promise<{ locale: string | any }>; // Handle both promise and object
}
import { getTranslations } from "next-intl/server";

import { getFilterHotelsData, getHomeData } from "@/lib/serverActions";

import HomeSlider from "@/components/homePage/HomeSlider";
import HomeFilter from "@/components/shared/filter/HomeFilter";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const AboutSection = dynamic(() => import("@/components/homePage/AboutSection"), {
  loading: () => <div className="min-h-[400px]" />,
});

const OurBranches = dynamic(() => import("@/components/homePage/OurBranches"), {
  loading: () => <div className="min-h-[400px]" />,
});

const OurServices = dynamic(() => import("@/components/homePage/OurServices"), {
  loading: () => <div className="min-h-[200px]" />,
});

const Feedback = dynamic(() => import("@/components/homePage/Feedback"), {
  loading: () => <div className="min-h-[320px]" />,
});

const BlogsSection = dynamic(() => import("@/components/homePage/BlogsSection"), {
  loading: () => <div className="min-h-[400px]" />,
});

const ContactUsSection = dynamic(() => import("@/components/homePage/ContactUsSection"), {
  loading: () => <div className="min-h-[500px]" />,
});

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

  const [homeData, data] = await Promise.all([
    getHomeData(locale),
    getFilterHotelsData(locale),
  ]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between pt-28 rtl:text-right ltr:text-left">
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
