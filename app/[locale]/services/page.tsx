import Banner from "@/components/reusableComponent/Banner";
import Container from "@/components/reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import pic1 from "@/public/card.webp";
import { getServicesData } from "@/lib/serverActions";
import ServiceCard from "@/components/homePage/ServiceCard";
import { Metadata } from "next";



export async function generateMetadata({ params }: any): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("services.title"),
    description: t("services.description"),
    keywords: [
      t("services.hotel_management_services"),
      t("services.hospitality_solutions"),
      t("services.operations"),
      t("services.consulting"),
      t("services.Durrat_Tayba"),
    ],
  };
}


export default async function Page({ params }: any) {
  const { locale } = await params;
  const t = await getTranslations("services");

  const data = await getServicesData(locale);


  return (
    <Container className="!pt-0">
      {/* <Banner img={data?.data?.header?.image?.original_url} title={t("title")} description={data?.data?.header?.text} /> */}
      <Banner
        img={
          data?.data?.header?.image?.original_url ||
          data?.data?.header?.image ||
          pic1
        }
        title={t("title")}
        description={data?.data?.header?.description}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8 mt-[100px]" data-aos="fade-up" data-aos-duration="1000">
        {data?.data?.data?.map((service:any) => (
          <ServiceCard key={service?.id} service={service} />
        ))}
      </div>

      {/* <div className="mt-[100px]">
        <p>{data?.data?.text}</p>
        <p className="mt-5">{data?.data?.info}</p>
      </div> */}
    </Container>
  );
}
