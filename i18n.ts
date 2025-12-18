import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

type Locale = (typeof routing.locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const resolvedLocale = await requestLocale;

  let locale: Locale;

  // لو undefined أو مش ضمن اللغات
  if (!resolvedLocale || !routing.locales.includes(resolvedLocale as Locale)) {
    locale = routing.defaultLocale;
  } else {
    locale = resolvedLocale.split('-')[0] as Locale;
  }

  const messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});


// import {notFound} from 'next/navigation';
// import {getRequestConfig} from 'next-intl/server';

// export const locales = ['en', 'ar'] as const;
// export const defaultLocale = 'ar' as const;

// export default getRequestConfig(async (param) => {
//   const locale = await param?.locale;

//   // Validate that the incoming `locale` parameter is valid
//   if (!locales.includes(locale as any)) notFound();

//   return {
//     locale,
//     messages: (await import(`./messages/${locale}.json`)).default,
//     timeZone: 'Asia/Dubai'
//   };
// });
