import React, { useEffect, useState } from "react";

const VerificationStatus = ({ value }: { value: string }) => {
  const [clsx, setClx] = useState("");
  useEffect(() => {
    setClx(() => {
      switch (value) {
        case "PENDING":
          return "bg-pending-bg text-pending-text border-pending-border  ";
        case "VERIFIED":
          return "bg-success-bg text-success-text bg-success-bg border-success-border ";
        case "REJECTED":
          return "bg-error-bg text-error-text bg-error-bg border-error-border ";
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

export default VerificationStatus;
