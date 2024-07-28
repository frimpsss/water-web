import React from "react";
import { getMonthAndYear, monthNames } from "../../../utils";

const ViewBillModal = ({
  closeModal,
  data,
}: {
  closeModal: () => void;
  data: any;
}) => {
  console.log(data);
  return (
    <div className="w-[39vw] p-2">
      <div className=" border-b-[1px] border-mountain-mist-200">
        <h4 className="text-ebony-950 font-bold text-[1.6rem] leading-[2.4rem]">
          Display Bill
        </h4>
        <p className="text-mountain-mist-300 text-[0.99rem] font-extralight">
          View Bill for details
        </p>
      </div>

      <div className="my-6 grid grid-cols-1 gap-1">
        <div className="grid grid-cols-2 border-[0.5px] border-mountain-mist-100  ">
          <h4 className="font-semibold flex items-center pl-2">Bill id</h4>
          <p className="font-light text-mountain-mist-400  pl-2 bg-mountain-mist-100 py-2 ">
            #{data?._id}
          </p>
        </div>
        <div className="grid grid-cols-2 border-[0.5px] border-mountain-mist-100 ">
          <h4 className="font-semibold flex items-center pl-2">
            Billing period
          </h4>
          <p className="font-light text-mountain-mist-400  pl-2 bg-mountain-mist-100 py-2 ">
            {monthNames[getMonthAndYear(data.billingPeriodEnd).month - 1]} -{" "}
            {getMonthAndYear(data.billingPeriodEnd).year}
          </p>
        </div>
        <div className="grid grid-cols-2 border-[0.5px]  border-mountain-mist-100 ">
          <h4 className="font-semibold flex items-center pl-2">Customer</h4>
          <p className="font-light text-mountain-mist-400  pl-2 bg-mountain-mist-100 py-2 ">
            {data?.meterId?.userId?.name}
          </p>
        </div>
        <div className="grid grid-cols-2 border-[0.5px]  border-mountain-mist-100 ">
          <h4 className="font-semibold flex items-center pl-2">
            Total Consumption
          </h4>
          <p className="font-light text-mountain-mist-400  pl-2 bg-mountain-mist-100 py-2 ">
            {parseFloat(data?.totalConsumption).toFixed(2)} liters
          </p>
        </div>

        <h4 className="font-bold mt-4 text-[1.2rem]">Tariffs</h4>
        {data?.tariffs?.map((e: any, i: number) => {
          console.log(e?.rate, 100, data?.totalConsumption);
          return (
            <div
              className="grid grid-cols-2 border-[0.5px] border-mountain-mist-100  "
              key={i}
            >
              <h4 className="font-semibold flex items-center pl-2">
                {e?.tariffId?.name} ({e?.rate}%)
              </h4>
              <p className="font-light text-mountain-mist-400  pl-2 bg-mountain-mist-100 py-2 ">
                GH¢ {Number(e?.rate * 0.01 * data?.totalConsumption).toFixed(2)}
              </p>
            </div>
          );
        })}
        <div className="grid grid-cols-2 border-[0.5px]  border-mountain-mist-100 ">
          <h4 className="font-semibold flex items-center pl-2">
            Total Amount Due
          </h4>
          <p className="font-light text-mountain-mist-400  pl-2 bg-mountain-mist-100 py-2 ">
            GH¢ {parseFloat(data?.totalAmountDue).toFixed(2)}
          </p>
        </div>
        <div className="grid grid-cols-2 border-[0.5px]  border-mountain-mist-100 ">
          <h4 className="font-semibold flex items-center pl-2">Bill Status</h4>
          <p className="font-light text-mountain-mist-400  pl-2 bg-mountain-mist-100 py-2 ">
            {data?.status}
          </p>
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

export default ViewBillModal;
