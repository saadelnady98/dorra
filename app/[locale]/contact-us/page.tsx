import Banner from "@/components/reusableComponent/Banner";
import Container from "@/components/reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import facebook from "@/public/facebookc.svg";
import linkedin from "@/public/linkedinc.svg";
import youtube from "@/public/youtubec.svg";
import { getContactUsData } from "@/lib/serverActions";
import SectionTitle from "@/components/reusableComponent/SectionTitle";
import Image from "next/image";
import Phone from "@/public/phone.svg";
import Whatsapp from "@/public/whatsappc.svg";
import Email from "@/public/smsc.svg";
import Link from "next/link";
import ContactForm from "@/components/homePage/ContactForm";
import defaultimg from "@/public/defaultimg.webp";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("contact-us.title"),
    description: t("contact-us.description"),
    keywords: [
      t("contact-us.contact_Durrat_Tayba"),
      t("contact-us.hotel_inquiries"),
      t("contact-us.hotel_management_contact"),
      t("contact-us.customer_support"),
    ],
  };
}

export default async function Page({ params }: any) {
  const { locale } = await params;
  const t = await getTranslations("contactUs");

  const data = await getContactUsData(locale);
// دالة مساعدة لتهيئة معلومات الاتصال بناءً على النوع

const formatContactLink = (info: string, type?: string) => {
  if (!info) return '';
  
  switch (type) {
    case 'phone':
      // إزالة أي مسافات أو رموز من رقم الهاتف
      const cleanPhone = info.replace(/[\s\-\(\)]/g, '');
      return `tel:${cleanPhone}`;
    
    case 'email':
      return `mailto:${info}?subject=Contact&body=Hello`;
    
    case 'whatsapp':
      const cleanWhatsapp = info.replace(/[\s\-\(\)]/g, '');
      return `https://wa.me/${cleanWhatsapp}`;
    
    default:
      return info;
  }
};
  const long = data?.data?.data?.location?.long;
  const lat = data?.data?.data?.location?.lat;

  const iframSrc =
    locale === "ar"
      ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${long}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzUuOSJF!5e0!3m2!1sar!2seg!4v1709465154599!5m2!1sar!2seg`
      : `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${long}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzUuOSJF!5e0!3m2!1sen!2sus!4v1709465154599!5m2!1sen!2sus`;

  const socialLinks = [
    {
      icon: facebook,
      text: t("facebook"),
      link: data?.data?.data?.social?.facebook,
    },
    {
      icon: linkedin,
      text: t("linkedin"),
      link: data?.data?.data?.social?.linkedin,
    },
    {
      icon: youtube,
      text: t("youtube"),
      link: data?.data?.data?.social?.youtube,
    },
  ];

  const contactInfo = [
    { icon: Phone, text: t("phone"), link:formatContactLink(data?.data?.data?.contacts?.phone1, "phone"), info:data?.data?.data?.contacts?.phone1 },
    {
      icon: Whatsapp,
      text: t("whatsapp"),
      link: formatContactLink(data?.data?.data?.contacts?.whatsapp, "whatsapp"),
      info:data?.data?.data?.contacts?.whatsapp,
    },
    { icon: Email, text: t("email"), link: formatContactLink(data?.data?.data?.contacts?.email, "email"), info:data?.data?.data?.contacts?.email },
  ];
  return (
    <>
      <Container className="!pt-0">
        {/* <Banner img={data?.data?.header?.image?.original_url} title={t("title")} description={data?.data?.header?.text} /> */}
        <Banner
          img={data?.data?.header?.image?.original_url}
          title={t("title")}
          description={data?.data?.header?.description}
        />
        <div data-aos="fade-up" data-aos-duration="1000">
          <SectionTitle
            className="!mt-24"
            title={t("contact_info")}
            description={t("contact_info_desc")}
          />
          <div className="flex gap-3 md:gap-4 lg:gap-8 justify-center mb-10">
            {socialLinks?.map(
              (item, index) =>
                item?.link && (
                  <Link href={item?.link} target="_blank" key={index}>
                    <Image
                      src={item?.icon || defaultimg}
                      alt="contact-us"
                      width={50}
                      height={50}
                      className="object-cover w-8 h-8"
                      unoptimized
                    />
                  </Link>
                )
            )}
          </div>{" "}
        </div>
        <div
  className="w-full lg:h-[500px] flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8"
  data-aos="fade-up"
  data-aos-duration="1000"
>
  {/* الخريطة */}
  <div className="w-full lg:w-2/3 h-[300px] lg:h-full rounded-3xl overflow-hidden shadow-lg">
    <iframe
      src={iframSrc}
      width="100%"
      height="100%"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
      className="grayscale h-full transition-all duration-300 hover:grayscale-0"
    />
  </div>

  {/* معلومات الاتصال */}
  <div className="w-full lg:w-1/3 flex flex-col gap-4 lg:gap-6">
    {contactInfo?.map((item: any, index) => (
      <div 
        key={index}
        className="w-full rounded-2xl bg-white bg-opacity-5 border border-white border-opacity-20 p-6 hover:bg-opacity-10 hover:border-opacity-30 transition-all duration-300 group"
      >
        <div className="flex items-start gap-4 mb-4">
          {/* أيقونة */}
          <div className="w-12 h-12 bg-white bg-opacity-10 rounded-xl flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-300 flex-shrink-0">
            <div className="text-[#CAB16C]">
              <Image
                src={item.icon || defaultimg}
                alt={item.text || "contact"}
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
          </div>
          
          {/* النص */}
          <div className="flex-1">
            <h3 className="text-white font-medium text-lg mb-1">{item.text}</h3>
            
           
              <Link
                href={item.link}
                target={"_blank"}
                rel={"noopener noreferrer"}
                className="text-[#CAB16C] hover:text-[#e0c58a] font-medium text-base transition-all duration-300 flex items-center gap-2 group/link"
              >
                {item.info}
                
                
           {locale === "en" ? (
  <svg
    className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
) : (
  <svg
    className="w-4 h-4 transform -scale-x-100 group-hover/link:-translate-x-1 transition-transform duration-300"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
)}

                
              </Link>
            
          </div>
        </div>

        {/* وصف إضافي إذا وجد */}
        {item.description && (
          <p className="text-white text-opacity-70 text-sm mt-3 pl-16">
            {item.description}
          </p>
        )}
      </div>
    ))}
  </div>
</div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <SectionTitle
            className="!mt-24"
            title={t("contact_form")}
            description={t("contact_info_desc")}
          />

          <ContactForm btnAlignEnd withMessage />
        </div>{" "}
      </Container>
    </>
  );
}
