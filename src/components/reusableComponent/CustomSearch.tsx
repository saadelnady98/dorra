import { useTranslations } from "next-intl";


type CustomSearchProps = {
    register: any;

}
const CustomSearch = (props : CustomSearchProps) => {

    const t = useTranslations("CustomSearch");
    

    return (
        <div className="relative w-full ">
            <label htmlFor="Search" className="sr-only">
                {t("search")}
            </label>

            <input type="text" id="Search"    placeholder={t("search")} className=" rounded-[12px] w-full h-full bg-[#FFFFFF1A] text-white focus:outline-none px-[50px] py-[16px] shadow-sm sm:text-sm"  {...props.register('search')}/>

             <span className="absolute inset-y-0 start-0 grid w-10 place-content-center">
                <button type="button" className="text-gray-600 hover:text-gray-700">
                    <span className="sr-only">{t("search")}</span>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-[#CAB16C]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </span>
        </div>
    );
};

export default CustomSearch;
