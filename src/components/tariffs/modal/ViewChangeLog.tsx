import { update } from "lodash";
import React from "react";
import { formatDate } from "../../../utils";

const ViewChangeLog = ({ data, closeModal }: any) => {
  return (
    <div className="w-[39vw] p-2">
      <div className=" border-b-[1px] border-mountain-mist-200">
        <h4 className="text-ebony-950 font-bold text-[1.6rem] leading-[2.4rem]">
          Change log
        </h4>
        <p className="text-mountain-mist-300 text-[0.99rem] font-extralight">
          View history of changes on the tariff.Ì
        </p>
      </div>

      <div className="my-6 max-h-[50vh] overflow-scroll grid grid-cols-1 gap-4 scrollbar-hide">
        {data?.updateHistory?.map((e, i) => {
          return (
            <div key={i} className="grid grid-cols-12">
              <div className="col-span-2 flex">
                <div className="bg-mantis-950 text-white-50 font-bold flex items-center justify-center w-[40px] h-[40px] text-[0.9rem] rounded-md ">
                  <h4>
                    {Number(i + 1)
                      .toString()
                      .padStart(2, "0")}
                    .
                  </h4>
                </div>
              </div>
              <div className="col-span-10 bg-white-100 rounded-md p-3">
                <div>
                  <h6 className="text-ebony-950 font-semibold">
                    {e?.type == "rate" ? "Rate Change" : "Status Change"}
                  </h6>
                </div>
                <div className="bg-white-50 p-2 mt-2 rounded">
                  {e?.type == "rate" ? (
                    <div>
                      <p className="text-[0.85rem] font-light">
                        We changed the rate from{" "}
                        <span className="inline-block bg-mountain-mist-100 px-1 font-semibold rounded text-mountain-mist-700">
                          {e?.updates?.oldRate}%
                        </span>{" "}
                        to{" "}
                        <span className="inline-block bg-mountain-mist-100 px-1 font-semibold rounded text-mountain-mist-700">
                          {e?.updates?.newRate || "N/A"}%
                        </span>
                        . This change is effective{" "}
                        <span className="inline-block bg-mountain-mist-100 px-1 font-semibold rounded text-mountain-mist-700">
                          {formatDate(new Date(e?.updates?.effectiveFrom))}
                        </span>{" "}
                      </p>

                      <p className="text-right mt-2 font-light text-mountain-mist-400 text-[0.8rem] ">
                        Date of change: {formatDate(new Date(e?.updates?.date))}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-[0.85rem] font-light">
                        We changed the status from{" "}
                        <span className="inline-block bg-mountain-mist-100 px-1 font-semibold rounded text-mountain-mist-700">
                          {e?.updates?.oldStatus}
                        </span>{" "}
                        to{" "}
                        <span className="inline-block bg-mountain-mist-100 px-1 font-semibold rounded text-mountain-mist-700">
                          {e?.updates?.newStatus || "N/A"}
                        </span>
                        . This change is effective{" "}
                        <span className="inline-block bg-mountain-mist-100 px-1 font-semibold rounded text-mountain-mist-700">
                          {formatDate(new Date(e?.updates?.date))}
                        </span>{" "}
                      </p>
                      <p className="text-right mt-2 font-light text-mountain-mist-400 text-[0.8rem] ">
                        Date of change: {formatDate(new Date(e?.updates?.date))}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
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

export default ViewChangeLog;
