// components/ui/RoomCardSkeleton.tsx
import React from "react";

const RoomCardSkeleton = () => {
  return (
    <div className="group bg-white bg-opacity-5 border border-white/10 rounded-3xl overflow-hidden animate-pulse">
      {/* Image Section */}
      <div className="w-full h-48 bg-white/10"></div>

      {/* Content Section */}
      <div className="p-5 flex flex-col gap-3">
        <div className="h-6 w-3/4 bg-white/10 rounded"></div>
        <div className="h-4 w-1/4 bg-white/10 rounded"></div>

        <div className="flex gap-2 mt-2">
          <div className="h-6 w-16 bg-white/10 rounded"></div>
          <div className="h-6 w-16 bg-white/10 rounded"></div>
        </div>

        <div className="flex gap-2 mt-2">
          <div className="h-8 flex-1 bg-white/10 rounded-xl"></div>
          <div className="h-8 flex-1 bg-white/10 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default RoomCardSkeleton;
