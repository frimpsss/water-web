import React from "react";

const CurrentTariffsSkeleton = () => {
  return (
    <div className="grid grid-cols-4 col-span-12 gap-6 animate-pulse">
      {[1, 3, 4, 5, 5].map((e, i) => {
        return (
          <div className="bg-mountain-mist-100 row-span-6 rounded-md h-[160px]"></div>
        );
      })}
    </div>
  );
};

export default CurrentTariffsSkeleton;
