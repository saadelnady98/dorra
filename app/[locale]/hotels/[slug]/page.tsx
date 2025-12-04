interface LayoutProps {
  params: Promise<{ locale: string | any; slug: string }>; // Handle both promise and object
}

import AboutSingleHotel from "@/components/singleHotelPage/AboutSingleHotel ";
import NearbyLandmarks from "@/components/singleHotelPage/NearbyLandmarks";

import Rooms from "@/components/singleHotelPage/Rooms";
import { getSingleHotelData } from "@/lib/serverActions";
import { getTranslations } from "next-intl/server";
import LocationHotel from "@/components/singleHotelPage/LocationHotel";
import PrivacyHotel from "@/components/singleHotelPage/PrivacyHotel";
import FaqsHotel from "@/components/reusableComponent/FaqsHotel";
import SimilarHotel from "@/components/singleHotelPage/SimilarHotel";
import TabNavigation from "@/components/singleHotelPage/TabNavigation";
import HotelImagesClient from "@/components/singleHotelPage/HotelImagesClient";

import RoomsContainer from "@/components/singleHotelPage/RoomsContainer";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { locale, slug } = await params;
  const singleHotel = await getSingleHotelData(slug, locale);
  return {
    title: singleHotel?.data?.name,
    description: singleHotel?.data?.description,
    openGraph: {
      images: [
        {
          url: singleHotel?.data?.images?.[0]?.original_url,
        },
      ],
    },
  };
}

export default async function SingleHotelPage({ params }: LayoutProps) {
  const { locale, slug } = await params;
  const t = await getTranslations("SingleHotelPage");

  const hotelData = await getSingleHotelData(slug, locale);
 
  const tabLabels = [
    { id: "rooms", label: t("available_rooms") },
    { id: "about", label: t("about_hotel") },
    { id: "landmarks", label: t("near_places") },
    { id: "location", label: t("location") },
    { id: "privacy", label: t("privacy") },
    { id: "faqs", label: t("faqs") },
    { id: "similar", label: t("similar") },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-28 rtl:text-right ltr:text-left">
      <HotelImagesClient data={hotelData?.data} />
      <TabNavigation labels={tabLabels} />

      <RoomsContainer
        initialRooms={hotelData?.data?.rooms}
        hotelId={hotelData?.data?.id}
        locale={locale}
        hotelData={hotelData.data}
      />

      <div className="w-full" id="about">
        <AboutSingleHotel data={hotelData?.data} />
      </div>
      <div className="w-full" id="landmarks">
        <NearbyLandmarks
          data={hotelData?.data?.locations}
          address={hotelData?.data?.address}
        />
      </div>
      <div className="w-full" id="location">
        <LocationHotel
          data={{
            longitude: hotelData?.data?.longitude,
            latitude: hotelData?.data?.latitude,
            address: hotelData?.data?.address,
          }}
        />
      </div>
      <div className="w-full" id="privacy">
        <PrivacyHotel data={hotelData?.data?.privacy} />
      </div>
      <div className="w-full" id="faqs">
        <FaqsHotel data={hotelData?.data?.faqs} />
      </div>
      <div className="w-full" id="similar">
        <SimilarHotel data={hotelData?.hotels} />
      </div>
    </main>
  );
}
