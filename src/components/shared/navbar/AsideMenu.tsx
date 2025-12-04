// @ts-nocheck

"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import bag from "@/public/Bag.svg";
import close from "@/public/Close.svg";
import arrowLeft from "@/public/arrow-left.svg";

import MainLink from "@/components/reusableComponent/MainLink";
import Language from "./Language";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";

function AsideMenu({
  lang,
  iconColor,
  open,
  setOpen,
}: {
  lang: string;
  iconColor?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const t = useTranslations("navbar");
  const { cart } = useSelector((state: RootState) => state.cart);
  const cartCount = cart?.length || 0;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const menuItems: any[] = [
    { value: t("homeLink"), path: "/" },
    { value: t("aboutUs"), path: "/about-us" },
    { value: t("contactUs"), path: "/contact-us" },
    { value: t("services"), path: "/services" },
    { value: t("blogs"), path: "/blogs" },
    { value: t("faqs"), path: "/faqs" },
    { value: t("hotels"), path: "/hotels" },
    // { value: t("profile"), path: "/profile" },
    // { value: t("myAccount"), path: "/my-account" },
  ];

  return (
    <>
      {/* aside*/}
      <div
        className={`[&_*]:!text-white fixed top-0 left-0 w-[calc(100%-150px)] max-w-[350px] h-svh bg-[#1C1B19] backdrop-blur-sm z-[100] flex justify-center items-center duration-500 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="absolute top-5 left-0 px-8 flex gap-3 items-center justify-center cursor-pointer w-full"
          onClick={() => setOpen(false)}
        >
          <div className="w-full flex items-center justify-between ">
            <span className="text-white text-lg font-medium">{t("Menue")}</span>
            <Image src={close} alt="Close" width={20} height={20} />
          </div>
        </div>
        <div className="flex flex-col gap-6 items-center justify-between w-full px-8 text-xl font-medium h-full pt-[100px] pb-[20px]">
          {" "}
          <ul className="flex flex-col gap-6 items-end pb-6 w-full ">
            {menuItems?.map((item, i) => (
              <li
                key={item?.value}
                className={`translate-x-[-100%] w-full ${
                  open ? "!translate-x-0" : ""
                }`}
                style={{ transitionDuration: `${300 * (i + 1)}ms` }}
                onClick={() => setOpen(false)}
              >
                <MainLink
                  locale={lang}
                  href={item.path}
                  className="text-white w-full flex items-center justify-between "
                  onClick={() => setOpen(false)}
                >
                  <span className="text-base font-normal">{item.value}</span>
                  <Image
                    src={arrowLeft}
                    className={`${lang !== "ar" ? "rotate-180" : ""}`}
                    alt="icon"
                    width={20}
                    height={20}
                  />
                </MainLink>
              </li>
            ))}

            <div
              className={`flex items-center w-full justify-end translate-x-[-100%] ${
                open ? "!translate-x-0" : ""
              }`}
              style={{
                transitionDuration: `${300 * (menuItems?.length - 2)}ms`,
              }}
            >
              <MainLink
                href="/cart"
                className="w-full flex items-center justify-between"
              >
                <div className="relative min-w-[24px] h-6">
                  <div className="flex items-center gap-4 w-full h-full">
                    <span className="text-base font-normal">{t("cart")}</span>
                    <div className="relative">
                      <Image
                        src={bag}
                        alt="Shopping Bag"
                        width={20}
                        height={20}
                        className="object-contain w-full h-full"
                      />
                      {isClient && cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#CAB16C] text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Image
                  src={arrowLeft}
                  className={`${lang !== "ar" ? "rotate-180" : ""}`}
                  alt="icon"
                  width={20}
                  height={20}
                />
              </MainLink>
            </div>
          </ul>
          <div className="w-full flex items-center justify-between">
            <Language className="px-0 lg:flex w-full text-base font-normal" />
            <Image
              src={arrowLeft}
              className={`${lang !== "ar" ? "rotate-180" : ""}`}
              alt="icon"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
      {open && (
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 bg-[#00000000]/20 z-10 duration-500`}
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}

export default AsideMenu;
