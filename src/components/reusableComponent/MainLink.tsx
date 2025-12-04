"use client";
import useCurrentLang from "@/hooks/useCurrentLang";
import Link from "next/link";

interface MainLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  styleMe?: boolean;
}

const MainLink = (params: MainLinkProps) => {
  const { lang } = useCurrentLang();

  const { href, children, className } = params;



  return (
    <Link
      href={`/${lang}${href}`}
      className={`inline-block ${className} ${
        params?.styleMe
          ? "inline-flex items-center max-lg:text-[14px] justify-center h-[48px] px-5 lg:px-9 bg-white text-[#CAB16C] rounded-[40px] hover:bg-[#CAB16C] hover:text-white transition-colors"
          : ""
      } `}
    >
      {children}
    </Link>
  );

};

export default MainLink;
