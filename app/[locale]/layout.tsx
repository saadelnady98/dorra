import { Inter } from "next/font/google";
import Footer from "@/components/shared/Footer";
import { NextIntlClientProvider } from "next-intl";
import Providers from "@/providers/providers";
import { notFound } from "next/navigation";
import { locales } from "../../navigation";
import Navbar from "@/components/shared/Navbar";
import AOSInitializer from "@/components/AOSInitializer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string | any }>;
}) {
  const resolvedParams = await (params instanceof Promise
    ? params
    : Promise.resolve(params));
  const { locale: currentLocale } = resolvedParams;

  if (!locales.includes(currentLocale as any)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${currentLocale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider
      // locale={currentLocale || routing.defaultLocale}
      locale={currentLocale || "en"}
      messages={messages}
      timeZone="Asia/Dubai"
    >
      <Providers locale={currentLocale || "en"}>
      <AOSInitializer />
        <div
          dir={currentLocale === "ar" ? "rtl" : "ltr"}
          lang={currentLocale}
          className="min-h-screen"
        >
          <Navbar />
          {children}
          <Footer />
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}
