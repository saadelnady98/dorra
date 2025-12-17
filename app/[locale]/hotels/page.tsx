import Banner from "@/components/reusableComponent/Banner";
import React from "react";
import imag from "@/public/hotelsSlider.webp";
import HomeFilter from "@/components/shared/filter/HomeFilter";
import Container from "@/components/reusableComponent/Container";
import Hotels from "@/components/hotels/Hotels";
import { getFilterHotelsData } from "@/lib/serverActions";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("meta");
  return {
    title: t("hotels.title"),
    description: t("hotels.description"),
    keywords: [
      t("hotels.hotels_in_Saudi_Arabia"),
      t("hotels.Durrat_Tayba_hotels"),
      t("hotels.managed_hotels"),
      t("hotels.top_Saudi_hotels"),
    ],
  };
}
export default async function Page(props: any) {
  const params = props.params as { locale: string };
  const locale = params.locale;
  const data = await getFilterHotelsData(locale);

  const t = await getTranslations("banner");

  return (
    <div className=" flex flex-col gap-8">
      <Container>
        <Banner
          className="w-full  lg:!h-[375px]"
          title={t("dorra_hotels")}
          description={t("dorra_hotels_description")}
          img={imag}
        />
      </Container>
      <HomeFilter hotels={data?.data} locale={locale} />
      <Hotels locale={locale} />
    </div>
  );
}
