import React from "react";
import SectionTitle from "@/components/reusableComponent/SectionTitle";
import { getTranslations } from "next-intl/server";
import { Icon } from "@iconify/react";
import Container from "@/components/reusableComponent/Container";
import ContactForm from "./ContactForm";

interface ContactUsSectionProps {
  data: any;
  locale: string;
}

const ContactUsSection: React.FC<ContactUsSectionProps> = async ({
  data,
  locale,
}) => {
  const t = await getTranslations("ContactUsSection");
  const long = data?.location?.long || 46.6766391;
  const lat = data?.location?.lat || 24.7136138;

  const iframSrc =
    locale === "ar"
      ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${long}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzUuOSJF!5e0!3m2!1sar!2seg!4v1709465154599!5m2!1sar!2seg`
      : `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${long}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzUuOSJF!5e0!3m2!1sen!2sus!4v1709465154599!5m2!1sen!2sus`;

  // return null

  return (
    <section className="w-full">
      <Container>
        <div className="w-full" data-aos="fade-up" data-aos-delay="500">
          <SectionTitle
            title={t("ContactUs_section_title")}
            description={t("ContactUs_section_description")}
          />

          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-8 xl:gap-10 2xl:gap-16">
            {/* right - Map */}
            <div className="w-full lg:w-1/2 h-[300px] lg:h-[600px] rounded-lg overflow-hidden">
              <iframe
                // src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${long}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzUuOSJF!5e0!3m2!1sar!2seg!4v1709465154599!5m2!1sar!2seg`}
                src={iframSrc}
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                className="grayscale"
              />
            </div>
            {/* left */}
            <div className="w-full lg:w-1/2">
              <div className="bg-primary-900">
                <div className="container mx-auto px-4">
                  <div className="flex flex-col items-end max-w-xl ml-auto lg:w-full md:max-w-none">
                    {/* Contact Information */}
                    <div className="mb-8 w-full">
                      <h2 className="text-white text-2xl font-bold mb-4 md:text-lg">
                        {t("contact_info")}
                      </h2>
                      <div className="flex items-center justify-start gap-3 mb-4">
                        <Icon
                          icon="famicons:location-sharp"
                          className="text-[#CAB16C] text-2xl"
                        />
                        <p className="text-white text-base">
                          {data?.address?.text}
                        </p>
                      </div>
                      <div className="flex items-center justify-start gap-3">
                        <Icon
                          icon="ic:round-phone"
                          className="text-[#CAB16C] text-2xl"
                        />
                        <p className="text-white text-base">
                          {data?.contacts?.phone1}
                        </p>
                      </div>
                    </div>

                    <p className="text-white text-lg mb-6 md:text-base w-full">
                      {t("contact_des")}
                    </p>

                    {/* Contact Form */}
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactUsSection;
