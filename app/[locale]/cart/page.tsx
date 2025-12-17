import CartForm from "@/components/cart/CartForm";
import Container from "@/components/reusableComponent/Container";
import SectionTitle from "@/components/reusableComponent/SectionTitle";
import { getTranslations } from "next-intl/server";
import React from "react";
import CartRooms from "@/components/cart/CartRooms";

export default async function Page({ params }: any) {
  const { locale } = await params;
  const t = await getTranslations("Cart");

  return (
    <Container>
      <SectionTitle
        className="!mt-24"
        title={t("title")}
        description={t("description")}
        description2={t("description2")}
      />

      <div className="flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-1/2 ">
          <CartRooms />
        </div>
        <div className="w-full lg:w-1/2">
          <CartForm withMessage />
        </div>
      </div>
    </Container>
  );
}
