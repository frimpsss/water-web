import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid";
import React from "react";
interface props {
  limit: number;
  handleLimitChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  start: number;
  totalNumberOfItems: number;
  handleFirstPage: () => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handleLastPage: () => void;
}
const Pagination = ({
  limit,
  handleFirstPage,
  handleLastPage,
  handleLimitChange,
  handleNextPage,
  handlePreviousPage,
  start,
  totalNumberOfItems,
}: props) => {
  return (
    <div className="pt-4 flex items-center justify-end gap-6">
      <div className="flex items-center gap-2">
        <p className="text-[0.9rem]">Rows per page</p>
        <select
          className="focus:ring-mantis-950  py-[0.1rem] inset-0   rounded-md focus:border-mountain-mist-100"
          value={limit}
          onChange={handleLimitChange}
        >
          <option value={7}>7</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
        </select>
      </div>
      <div>
        <p className="font-semibold text-mountain-mist-600">
          Page {Math.floor(start / limit + 1)} of{" "}
          {Math.ceil(totalNumberOfItems / limit)}
        </p>
      </div>

      <div className="flex gap-1">
        <button
          className={`grid place-items-center border-mountain-mist-100 border-[1px]  rounded  ${
            start === 0 ? "" : " hover:bg-mountain-mist-100"
          }`}
          disabled={start === 0}
          onClick={handleFirstPage}
        >
          <ChevronDoubleLeftIcon
            className={`${
              start === 0 ? "text-mountain-mist-300" : "text-mountain-mist-800"
            } h-7 p-1`}
          />
        </button>
        <button
          className={`grid place-items-center border-mountain-mist-100 border-[1px]  rounded  ${
            start === 0 ? "" : " hover:bg-mountain-mist-100"
          }`}
          disabled={start === 0}
          onClick={handlePreviousPage}
        >
          <ChevronLeftIcon
            className={` ${
              start === 0 ? "text-mountain-mist-300" : "text-mountain-mist-800"
            } h-7 p-1`}
          />
        </button>

        <button
          className={`grid place-items-center border-mountain-mist-100 border-[1px]  rounded  ${
            start + limit >= totalNumberOfItems
              ? ""
              : " hover:bg-mountain-mist-100"
          }`}
          disabled={start + limit >= totalNumberOfItems}
          onClick={handleNextPage}
        >
          <ChevronRightIcon
            className={`${
              start + limit >= totalNumberOfItems
                ? "text-mountain-mist-300"
                : "text-mountain-mist-800"
            } h-7 p-1`}
          />
        </button>
        <button
          className={`grid place-items-center border-mountain-mist-100 border-[1px]  rounded  ${
            start + limit >= totalNumberOfItems
              ? ""
              : " hover:bg-mountain-mist-100 "
          }`}
          disabled={start + limit >= totalNumberOfItems}
          onClick={handleLastPage}
        >
          <ChevronDoubleRightIcon
            className={` ${
              start + limit >= totalNumberOfItems
                ? " text-mountain-mist-300 "
                : "text-mountain-mist-800 "
            } h-7 p-1`}
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
