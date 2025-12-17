


import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar'],
 
  // Used when no locale matches
  defaultLocale: 'ar'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en)/:path*']
};




// import { NextRequest, NextResponse } from 'next/server';
// import createMiddleware from 'next-intl/middleware';
// import { routing } from './routing';
 
// const middleware = createMiddleware(routing);
// export default function enhancedMiddleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Skip API routes and assets
//   if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
//     return NextResponse.next();
//   }

//   // Check if the path already includes a locale
//   let locale = routing.locales.find((locale) => pathname.startsWith(`/${locale}`));
//   if (!locale) {
//     const defaultLocale = routing.defaultLocale;
//     return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
//   }

//   // Validate locale (this part is redundant as the previous block already validates locales)
//   if (!routing.locales.includes(locale)) {
//     locale = routing.defaultLocale;
//   }
// return middleware(request);
// }
// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(ar|en)/:path*']
// };




