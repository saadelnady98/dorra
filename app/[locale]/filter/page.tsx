import Filter from "@/components/shared/filter/HomeFilter"
import { getFilterHotelsData } from "@/lib/serverActions"
import React from "react"
interface LayoutProps {
    params: Promise<{ locale: string | any }> // Handle both promise and object
}
const page = async ({ params }: LayoutProps) => {
    const { locale } = await params
    const data = await getFilterHotelsData(locale)

    return (
        <div>
            <Filter hotels={data} locale={locale} />
        </div>
    )
}

export default page
