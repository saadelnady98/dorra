"use server";

import apiServiceCall from "./apiServiceCall";

export const getContactUs = async (lang: string) => {
  return apiServiceCall({
    url: `setting_web/contacts`,
    headers: { "Accept-Language": lang },
  });
};

export const getHomeData = async (lang: string) => {
  return apiServiceCall({
    url: "home_web",
    headers: { "Accept-Language": lang },
  });
};

export const getFaqsData = async (lang: string) => {
  return apiServiceCall({
    url: "faq_web",
    headers: { "Accept-Language": lang },
  });
};

export const getContactUsData = async (lang: string) => {
  return apiServiceCall({
    url: "setting_web/contacts",
    headers: { "Accept-Language": lang },
  });
};

export const getSingleHotelData = async (slug: string, lang: string) => {
  return apiServiceCall({
    url: `hotel_web/${slug}`,
    headers: { "Accept-Language": lang },
  });
};

export const getSingleServiceData = async (slug: string, lang: string) => {
  return apiServiceCall({
    url: `service_web/${slug}`,
    headers: { "Accept-Language": lang },
  });
};

export const getTermsData = async (lang: string) => {
  return apiServiceCall({
    url: `setting_web/terms`,
    headers: { "Accept-Language": lang },
  });
};

export const getPrivacyData = async (lang: string) => {
  return apiServiceCall({
    url: `setting_web/privacy`,
    headers: { "Accept-Language": lang },
  });
};

export const getServicesData = async (lang: string) => {
  return apiServiceCall({
    url: `service_web`,
    headers: { "Accept-Language": lang },
  });
};

export const getBlogData = async (lang: string) => {
  return apiServiceCall({
    url: `blog_web`,
    headers: { "Accept-Language": lang },
  });
};

export const getSingleBlogData = async (slug: string, lang: string) => {
  return apiServiceCall({
    url: `blog_web/${slug}`,
    headers: { "Accept-Language": lang },
  });
};
export const getFilterHotelsData = async (lang: string) => {
  return apiServiceCall({
    url: `filter/hotels`,
    headers: { "Accept-Language": lang },
  });
};

export const getAboutUsData = async (lang: string) => {
  return apiServiceCall({
    url: `about_web`,
    headers: { "Accept-Language": lang },
  });
};

// export const getBlogs = async (lang: string) => {
//     return apiServiceCall({ url: "blog", headers: { lang } })
// }

// export const getBlog = async (id: string, lang: string) => {
//     return apiServiceCall({ url: `blog/${id}`, headers: { lang: lang } })
// }

// export const getDevelopers = async (lang: string) => {
//     return apiServiceCall({ url: "developer", headers: { lang: lang } })
// }

// export const getDeveloper = async (id: string, lang: string) => {
//     return apiServiceCall({ url: `developer/${id}`, headers: { lang: lang } })
// }

// export const getTerms = async (lang: string) => {
//     return apiServiceCall({ url: `setting/terms`, headers: { lang: lang } })
// }

// export const getPrivacy = async (lang: string) => {
//     return apiServiceCall({ url: `setting/privacy`, headers: { lang: lang } })
// }

// export const getHomePropertyDiscoverData = async (lang: string) => {
//     return apiServiceCall({ url: "discover", headers: { lang: lang } })
// }

// export const getAboutUs = async (lang: string) => {
//     return apiServiceCall({ url: "aboutushome", headers: { lang: lang } })
// }

// export const getFaqs = async (lang: string) => {
//     return apiServiceCall({ url: "faq", headers: { lang: lang } })
// }

// export const getAllAreasData = async (lang: string) => {
//     return apiServiceCall({ url: "area", headers: { lang: lang } })
// }
// export const getHomeTopAreasData = async (lang: string) => {
//     return apiServiceCall({
//         url: "area/highlighted_areas",
//         headers: { lang: lang },
//     })
// }
// export const getHomeWhyChooseUsData = async (lang: string) => {
//     return apiServiceCall({ url: "whychooseus", headers: { lang: lang } })
// }
// export const getHomeDeveloperData = async (lang: string) => {
//     return apiServiceCall({ url: "developer", headers: { lang: lang } })
// }
// export const getHomeTopPalanProperyData = async (lang: string) => {
//     return apiServiceCall({ url: "product", headers: { lang: lang } })
// }
// export const getSpacificProperyData = async (slug: string, lang: string) => {
//     return apiServiceCall({ url: `product/${slug}`, headers: { lang: lang } })
// }
