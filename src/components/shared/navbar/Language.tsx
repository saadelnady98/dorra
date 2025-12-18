"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCurrentLang from "@/hooks/useCurrentLang";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
 
 
const LanguageSwitcher = ({ className }: { className?: string }) => {
  const t = useTranslations("navbar");
  const router = useRouter();
  const pathname = usePathname();
  const { lang } = useCurrentLang();

  const toggleLanguage = () => {
    const targetLang = lang === "en" ? "ar" : "en";
    const newPath = `/${targetLang}${pathname.replace(/^\/(en|ar)/, "")}`;
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(className, "text-white")}
    >
      {lang === "en" ? t("arabic") : t("english")}
    </button>
  );
};

export default LanguageSwitcher;


// "use client"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useTranslations } from "next-intl"
// import { usePathname, useRouter } from "next/navigation"

// const Languge = ({className }: {className? : string}) => {
//     const t = useTranslations("navbar")
//     const router = useRouter()
//     const pathname = usePathname()
//     const changeLanguage = (locale: string) => {
//         const newPath = `/${locale}${pathname.replace(/^\/(en|ar)/, "")}` // Adjust based on locales
//         router.push(newPath)
//     }

//     return (
//         <>
//             {" "}
//             <Select onValueChange={changeLanguage}>
//             <SelectTrigger className={`border-none outline-none bg-transparent focus:ring-0 shadow-none ${className ? className : ""}`}>

//                 {/* <SelectTrigger className="border-none outline-none bg-transparent focus:ring-0 shadow-none"> */}
//                     <SelectValue placeholder={pathname.split("/")[1] === "en" ? t("english") : t("arabic")} />
//                 </SelectTrigger>
//                 <SelectContent>
//                     {" "}
//                     <SelectItem value="en">{t("english")}</SelectItem>
//                     <SelectItem value="ar">{t("arabic")}</SelectItem>
//                 </SelectContent>
//             </Select>
//         </>
//     )
// }

// export default Languge
