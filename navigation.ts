// import {createSharedPathnamesNavigation} from 'next-intl/navigation';
 
// export const locales = ['en', 'ar'] as const;
// export const defaultLocale = 'ar';
 
// export const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation({locales});


import {createNavigation} from 'next-intl/navigation';

export const locales = ['ar', 'en'];
export const defaultLocale = 'ar';

export const {
  Link,
  redirect,
  usePathname,
  useRouter
} = createNavigation({locales});
