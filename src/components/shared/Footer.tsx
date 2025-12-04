import React from "react";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { Icon } from "@iconify/react";
import MainLink from "@/components/reusableComponent/MainLink";
import Container from "@/components/reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import { getContactUs } from "@/lib/serverActions";
import Link from "next/link";
import defaultimg from "@/public/defaultimg.webp";
import dubisignLogo from "@/public/dubisignlogo.webp";

const Footer: React.FC = async (params: any) => {
  const { locale: language } = await params;
  const { data } = await getContactUs(language);

  const t = await getTranslations("footer");
  const mainLinks = [
    {
      href: "/",
      text: t("Home"),
    },
    {
      href: "about-us",
      text: t("About Hotel"),
    },
    {
      href: "contact-us",
      text: t("Contact Us"),
    },
    {
      href: "services",
      text: t("Our Services"),
    },
    {
      href: "faqs",
      text: t("FAQ"),
    },
  ];

  const legalLinks = [
    {
      href: "privacy",
      text: t("Privacy Policy"),
    },
    {
      href: "terms",
      text: t("Terms & Conditions"),
    },
  ];
  const socialMedia = [
    {
      id: 1,
      href: `${data?.data?.social?.facebook}` || "/",
      icon: "uil:facebook",
    },
    {
      id: 2,
      href: `${data?.data?.social?.linkedin}` || "/",
      icon: "flowbite:linkedin-solid",
    },
    {
      id: 3,
      href: `${data?.data?.social?.youtube}` || "/",
      icon: "uil:youtube",
    },
    {
      id: 4,
      href: `${data?.data?.social?.instagram}` || "/",
      icon: "uil:instagram",
    },
    {
      id: 5,
      href: `${data?.data?.social?.snapchat}` || "/",
      icon: "basil:snapchat-solid",
    },
    // {
    //   href: data?.social?.tiktok,
    //   icon: "ic:baseline-tiktok",
    // },
  ];

  return (
    <footer className="bg-[#ffffff03] border-t border-[#ffffff20] pt-[24px] pb-4 text-white">
      {/* <footer className="bg-white/[0.03] border-t border-white/20 pt-[32px] pb-8 text-white"> */}
      <Container className="!py-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-between mb-5">
          {/* logo */}
          <div className="col-span-2 md:col-span-1 mb-8 md:mb-0 md:mx-5">
            <Image
              className="w-[75px] h-[50px]"
              src={logo || defaultimg}
              width={500}
              height={400}
              alt="logo"
            />
          </div>

          {/* Main Links */}
          <div className="mb-4 md:mb-0 md:mx-5">
            <h3 className="text-lg mb-2 font-medium">{t("Main Links")}</h3>
            <ul className="space-y-2">
              {mainLinks?.map((link, index) => (
                <li key={link?.href || index}>
                  <MainLink
                    href={`/${link?.href}` || "/"}
                    className="opacity-90 hover:text-[#CAB16C] transition-colors"
                  >
                    {link?.text}
                  </MainLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="mb-4 md:mb-0 md:mx-5">
            <h3 className="text-lg mb-2 font-medium">{t("Legal")}</h3>
            <ul className="space-y-2">
              {legalLinks?.map((link, index) => (
                <li key={link?.href || index}>
                  <MainLink
                    href={`/${link?.href}` || "/"}
                    className="opacity-90 hover:text-[#CAB16C] transition-colors"
                  >
                    {link?.text}
                  </MainLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="mb-4 md:mb-0 md:mx-5">
            <h3 className="text-lg mb-2 font-medium ">{t("Social Media")}</h3>
            <div className="flex gap-4 flex-wrap">
              {socialMedia?.map((link, index) => (
                <Link
                  key={link?.id}
                  target="_blank"
                  href={link?.href}
                  className="opacity-90 hover:text-[#CAB16C] transition-colors"
                >
                  <Icon icon={link?.icon} className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px bg-[#fff6] my-4" />

        <div className="text-center">
          <div className="text-base opacity-90 m-0">
            {/* {t("Copyright")} 2025 {t("All Rights Reserved")} -{" "}
            {t("Durra Tayba")} */}
            {/* https://www.dubisign.ae/en/ */}© {t("copyR")}{" "}
            <p className="text-[#CAB16C] inline-flex align-center items-center gap-[5px]">
              {" "}
              Dubisign
              <Link
                href="https://www.dubisign.ae/en/"
                target="_blank"
                className="opacity-90 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={dubisignLogo}
                  className="w-[20px] h-[20px]"
                  alt="dubisign logo"
                  width={500}
                  height={400}
                />
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
