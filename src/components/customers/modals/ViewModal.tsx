import React from "react";
import { formatDate } from "../../../utils";
import VerificationStatus from "../VerificationStatus";

const ViewModal = ({ data, closeModal }: any) => {
  return (
    <div className="w-[35vw] p-2">
      <div className=" border-b-[1px] border-mountain-mist-200">
        <h4 className="text-ebony-950 font-bold text-[1.6rem] leading-[2.4rem]">
          View Customer Data
        </h4>
        <p className="text-mountain-mist-300 text-[0.99rem] font-extralight">
          Display existing customer data.
        </p>
      </div>
      <div className="grid grid-cols-2 w-full mt-8 gap-y-2">
        <DetailBox title={"Name"} value={data?.name} />
        <DetailBox title={"Email"} value={data?.email} />
        <DetailBox title={"Phone Number"} value={data?.phoneNumber} />
        <DetailBox
          title={"Date Joined"}
          value={formatDate(new Date(data?.createdAt))}
        />
        <DetailBox title={"GPS Address"} value={data?.meterId?.gpsAddress} />
        <DetailBox
          title={"Verification Status"}
          status={true}
          value={data?.verificationStage}
        />
        <DetailBox
          title={"Type of Meter"}
          value={data?.meterId?.meterType}
        />
      </div>

      <div
        className="flex items-center justify-end cursor-pointer"
        onClick={closeModal}
      >
        <p className="bg-ebony-950 text-white-50 font-semibold inline-block text-[1.2rem] px-4 rounded-lg py-1 mt-8 text-right">
          Close
        </p>
      </div>
    </div>
  );
};

function DetailBox({
  title,
  value,
  status = false,
}: {
  title: string;
  value?: string;
  status?: boolean;
}) {
  console.log(status);
  return (
    <div className=" ">
      <span className="">
        <h4 className="text-mountain-mist-400 text-[0.9rem]">{title}</h4>
      </span>
      {status == false ? (
        <span className="">
          <p className="text-ebony-950 font-semibold text-[1.1rem]  ">
            {value ?? "N/A"}
          </p>
        </span>
      ) : (
        <div className="w-[50%] mt-1">
          <VerificationStatus value={value} />
        </div>
      )}
    </div>
  );
}
export default ViewModal;
