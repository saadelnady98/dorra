export default function HotelCardSkeleton() {
  return (
    <div className="rounded-[24px] px-6 py-7 grid grid-cols-12 gap-6 border border-[#FFFFFF33] bg-[#FFFFFF0D] animate-pulse">
      <div className="col-span-12 lg:col-span-4 w-full h-[200px] bg-[#ffffff22] rounded-[16px]"></div>

      <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
        <div className="w-1/2 h-6 bg-[#ffffff22] rounded"></div>
        <div className="w-1/3 h-4 bg-[#ffffff22] rounded"></div>
        <div className="w-2/4 h-4 bg-[#ffffff22] rounded"></div>
        <div className="w-full h-20 bg-[#ffffff22] rounded"></div>

        <div className="flex justify-end mt-4">
          <div className="w-[150px] h-10 bg-[#ffffff22] rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
