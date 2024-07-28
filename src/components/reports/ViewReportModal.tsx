import React from "react";
import { formatDate } from "../../utils";

const ViewReportModal = ({ data, closeModal }: any) => {
  console.log(data);
  return (
    <div className="w-[35vw] p-2">
      <div className=" border-b-[1px] border-mountain-mist-200">
        <h4 className="text-ebony-950 font-bold text-[1.6rem] leading-[2.4rem]">
          View Report
        </h4>
        <p className="text-mountain-mist-300 text-[0.99rem] font-extralight">
          Display details for a report details
        </p>
      </div>
      <div className="grid grid-cols-2 w-full my-4 gap-y-2">
        <DetailBox title={"Created By"} value={data?.userId?.name} />
        <DetailBox
          title={"Date Created"}
          value={formatDate(new Date(data?.createdAt))}
        />
        <div className="col-span-2">
          <DetailBox title={"Title"} value={data?.title} />
        </div>
        <div className="col-span-2">
          <DetailBox title={"Description"} value={data?.description} />
        </div>
        <div className="col-span-2">
          <DetailBox
            title={"Attended to"}
            value={data?.attendedTo}
            status={true}
          />
        </div>
        {data?.attendedTo && (
          <div className="col-span-2">
            <DetailBox title={"Remarks"} value={data?.remarks} />
          </div>
        )}
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
        <div className=" mt-1">
          <p
            className={`text-[0.1.1rem] px-1  font-semibold  ${
              value ? "text-success-text" : "text-error-text"
            }`}
          >
            {value ? "YES" : "NO"}
          </p>
        </div>
      )}
    </div>
  );
}

export default ViewReportModal;
