import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "../src/globals.css";
import { headers } from "next/headers";
import { routing } from "../routing";
import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/store/Providers";

const inter = Inter({ subsets: ["latin"] });
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["arabic"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Dorra Taiba",
  description: "Your premier destination for Dorra Taiba",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the current locale from headers
  const headersList = await headers();
  const currentLocale =
    headersList.get("x-next-intl-locale") || routing.defaultLocale;

  return (
    <html
      lang={currentLocale}
      dir={currentLocale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`bg-[#11100D] min-h-screen ${currentLocale === "ar" ? ibmPlexSansArabic.className : inter.className
          }`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
        {/* <div className="fixed top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-md">
          from root layout {currentLocale === "ar" ? "العربية" : "English"}
        </div> */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            // Default options for all toasts
            style: {
              background: "#1F1F23",
              color: "#FFD966",
              padding: "18px 20px",
              borderRadius: "14px",
              fontWeight: "600",
              fontSize: "15px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255, 217, 102, 0.3)",
              transition: "transform 0.2s ease, opacity 0.2s ease",
            },
            success: {
              icon: "✅",
              style: {
                background: "#1F2F1F",
                color: "#6FCF97",
              },
            },
            error: {
              icon: "❌",
              style: {
                background: "#2F1F1F",
                color: "#F87171",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
