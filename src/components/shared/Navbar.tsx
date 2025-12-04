"use client";

import { useTranslations } from "next-intl";

import Image from "next/image";
import defaultimg from "@/public/defaultimg.webp";
// import { Icon } from "@iconify/react";
// import menu from "../../public/assets/menu.svg";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "../reusableComponent/Container";
import Language from "./navbar/Language";
import AsideMenu from "./navbar/AsideMenu";
import logo from "@/public/logo.svg";
import bag from "@/public/Bag.svg";
import menu from "@/public/menu.svg";
import MainLink from "@/components/reusableComponent/MainLink";
import useCurrentLang from "@/hooks/useCurrentLang";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Navbar = () => {
  const { lang } = useCurrentLang();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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
    { value: t("hotels"), path: "/hotels" },
    { value: t("blogs"), path: "/blogs" },
    { value: t("faqs"), path: "/faqs" },
    // { value: t("profile"), path: "/profile" },
    // { value: t("myAccount"), path: "/my-account" },
  ];

  // in (single blog | developer)

  const pathname = usePathname();
  let place = pathname.split("/").pop();
  // const place = "other-page"
  // // @ts-ignore

  let logoPath =
    place === "contact-us"
      ? "/logo.svg"
      : place === "developer"
      ? "/logoGold.svg"
      : "/Legacy Logo Desktop.svg";

  const isSingleBlog =
    pathname.includes("blogs") && place !== undefined && place !== "blogs";
  if (isSingleBlog) {
    place = "single-blog";

    logoPath = "/logoBlack.svg";
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //   const iconColor = inSingleBlogPage
  //     ? isScrolled
  //       ? "white"
  //       : "black"
  //     : "white";

  return (
    <>
      <AsideMenu
        iconColor={"white"}
        lang={lang}
        open={open}
        setOpen={setOpen}
      />
      <div
        className={`fixed w-full z-[99] text-white ${
          isScrolled ? "!bg-black/50 backdrop-blur-sm shadow-lg" : ""
        }`}
      >
        <Container className="!py-0">
          <nav className="flex items-center justify-between pt-[20px] pb-[10px] lg:pt-[25px] lg:pb-[15px] lg:mx-auto ">
            {/* Logo - Mobile */}
            <MainLink
              href="/"
              className="lg:hidden cursor-pointer relative w-[54px] h-[35px]"
            >
              <Image
                src={logo || defaultimg}
                alt="Logo"
                fill
                className="object-contain"
              />
            </MainLink>

            {/* Desktop View */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Logo - Desktop */}
              <MainLink href="/" className="relative w-[72px] h-[47px]">
                <Image
                  src={logo || defaultimg}
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </MainLink>

              {/* Menu Items */}
              <div className="flex items-center gap-8 text-[16px] font-normal">
                {menuItems.map((item, index) => (
                  <MainLink
                    key={index}
                    href={item.path}
                    className={`hover:text-[#CAB16C] transition-colors ${
                      place === item.path.replace("/", "") ||
                      place === item.path.replace("/", "") + "ar" ||
                      place === item.path.replace("/", "") + "en"
                        ? "text-[#CAB16C] after:content-[''] after:block after:w-[3px] after:h-[3px] after:bg-[#CAB16C] after:rounded-full after:transition-all after:duration-300 relative after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2"
                        : ""
                    }`}
                  >
                    {item.value}
                  </MainLink>
                ))}

                <Language className="px-0 hidden lg:flex" />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Desktop Cart Icon */}
              <div className="hidden lg:block relative min-w-[24px] h-6">
                <MainLink href="/cart">
                  <Image
                    src={bag || defaultimg}
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
                </MainLink>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setOpen(true)}
                className="w-6 h-6 lg:hidden relative"
              >
                <Image
                  src={menu || defaultimg}
                  alt="menu"
                  width={20}
                  height={20}
                  className="object-contain w-full h-full"
                />
              </button>
            </div>
          </nav>
        </Container>
      </div>
    </>
  );
};

export default Navbar;
