import Banner from "@/components/reusableComponent/Banner";
import Container from "@/components/reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import { getSingleBlogData } from "@/lib/serverActions";
import defaultimg from "@/public/defaultimg.webp";
import type { Metadata } from "next";

/* ================= TYPES ================= */
type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

/* ================= METADATA ================= */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params; // ✅ لازم await عشان params Promise

  const singleBlog = await getSingleBlogData(slug, locale);

  return {
    title: singleBlog?.data?.title,
    description: singleBlog?.data?.description,
    openGraph: {
      images: [
        {
          url: singleBlog?.data?.image?.original_url,
        },
      ],
    },
  };
}

/* ================= PAGE ================= */
export default async function Page({ params }: Props) {
  const { locale, slug } = await params; // ✅ await عشان params Promise

  const t = await getTranslations("services");
  const data = await getSingleBlogData(slug, locale);

  return (
    <Container className="!pt-[100px]">
      <div>
        <span className="text-base font-light mb-4">{data?.data?.date}</span>
        <h3 className="text-[18px] lg:text-[40px] lg:font-medium">
          {data?.data?.title}
        </h3>
      </div>

      <Banner
        img={data?.data?.image?.original_url || defaultimg}
        title={""}
        description={""}
        classNameWrapper="!pt-[30px]"
        withoutShadow
      />

      <div className="mt-[35px]">
        <p
          dangerouslySetInnerHTML={{
            __html: data?.data?.description,
          }}
        />
      </div>
    </Container>
  );
}
