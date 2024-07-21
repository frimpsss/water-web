import React, { useEffect, useState } from "react";

const TariffStatus = ({ value }: { value: string }) => {
  const [clsx, setClx] = useState("");
  useEffect(() => {
    setClx(() => {
      switch (value) {
        case "ACTIVE":
          return "bg-success-bg text-success-text bg-success-bg  ";
        case "INACTIVE":
          return "bg-error-bg text-error-text bg-error-bg  ";
      }
    });
  }, [value]);
  return (
    <div
      className={`${clsx} px-4 py-[0.15rem] text-[0.7rem] grid place-items-center  border-[1px] rounded-md flex-1`}
    >
      <p>{value}</p>
    </div>
  );
};

export default TariffStatus;
