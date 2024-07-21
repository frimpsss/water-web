import React from "react";
import { formatDate } from "../../../utils";
import TariffStatus from "../TariffStatus";

const ViewTariffDetailsModal = ({ data, closeModal }: any) => {
  return (
    <div className="w-[35vw] p-2">
      <div className=" border-b-[1px] border-mountain-mist-200">
        <h4 className="text-ebony-950 font-bold text-[1.6rem] leading-[2.4rem]">
          View Tariff Details
        </h4>
        <p className="text-mountain-mist-300 text-[0.99rem] font-extralight">
          Display details for a selected tariff
        </p>
      </div>
      <div className="grid grid-cols-2 w-full my-4 gap-y-2">
        <DetailBox title="Name" value={data?.name} />
        <DetailBox title="Rate" value={`${data?.rate}%`} />
        <DetailBox
          title="Effective From"
          value={formatDate(new Date(data?.effectiveFrom))}
        />
        <DetailBox
          title="Effective To"
          value={formatDate(new Date(data?.effectiveTo))}
        />
        <DetailBox
          title="Date Created"
          value={formatDate(new Date(data?.createdAt))}
        />
        <DetailBox
          title="Last Updated"
          value={formatDate(new Date(data?.updatedAt))}
        />
        <DetailBox title="Status" value={data.status} status />
        <div className="col-span-2">
          <DetailBox title="Description" value={data?.description} />
        </div>
      </div>
      <div className=" border-t-[1px] border-mountain-mist-200 pt-4">
        <div
          className="flex items-center justify-end cursor-pointer"
          onClick={closeModal}
        >
          <p className="bg-ebony-950 text-white-50 font-semibold inline-block text-[1.2rem] px-4 rounded-lg py-1  text-right">
            Close
          </p>
        </div>
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
          {/* <VerificationStatus value={value} /> */}
          <TariffStatus value={value} />
        </div>
      )}
    </div>
  );
}
export default ViewTariffDetailsModal;
