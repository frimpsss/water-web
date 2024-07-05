import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { Checkbox } from "@headlessui/react";
import TableHeader, {
  IProps as HeadersProps,
} from "../shared/table/TableHeader";
import { useState } from "react";
import useUrlState from "../../hooks/useUrlState";
const TableComponent = () => {
  const { queries, appendQuery, getQueryValue } = useUrlState();
  const [start, setStart] = useState(() => {
    const value = getQueryValue("start") as any;
    console.log(value);
    return isNaN(value) || !isFinite(value) || !value ? 1 : value;
  });

  const [limit, setLimit] = useState(() => {
    const value = getQueryValue("limit") as any;
    console.log(value);
    return isNaN(value) || !isFinite(value) || !value ? 5 : value;
  });
  const [enabled, setEnabled] = useState(false);
  const dummyData = [
    {
      reference: "chd732",
      customer: "Richmont Tetteh",
      date: "Jun 21, 2024, 7:30 PM",
      description: "Bill Payment - June 2024",
      amount: "GH¢ 23.43",
    },
    {
      reference: "hdf561",
      customer: "Augustine Danso",
      date: "Mar 6, 2024, 3:51 PM",
      description: "Bill Payment - February 2024",
      amount: "GH¢ 17.73",
    },
    {
      reference: "mnb123",
      customer: "Cynthia Asante",
      date: "Apr 15, 2024, 9:10 AM",
      description: "Bill Payment - April 2024",
      amount: "GH¢ 45.89",
    },
    {
      reference: "vgt456",
      customer: "Daniel Owusu",
      date: "May 22, 2024, 2:30 PM",
      description: "Bill Payment - May 2024",
      amount: "GH¢ 34.21",
    },
    {
      reference: "qwe789",
      customer: "Evelyn Mensah",
      date: "Jul 12, 2024, 11:45 AM",
      description: "Bill Payment - July 2024",
      amount: "GH¢ 27.34",
    },
    {
      reference: "asd654",
      customer: "Francis Osei",
      date: "Feb 28, 2024, 4:15 PM",
      description: "Bill Payment - February 2024",
      amount: "GH¢ 19.85",
    },
    {
      reference: "zxc321",
      customer: "Gloria Akuffo",
      date: "Jan 3, 2024, 6:00 PM",
      description: "Bill Payment - January 2024",
      amount: "GH¢ 50.00",
    },
    {
      reference: "rty987",
      customer: "Henry Appiah",
      date: "Mar 10, 2024, 8:20 AM",
      description: "Bill Payment - March 2024",
      amount: "GH¢ 22.47",
    },
    {
      reference: "fgh852",
      customer: "Irene Boateng",
      date: "Aug 19, 2024, 5:00 PM",
      description: "Bill Payment - August 2024",
      amount: "GH¢ 31.16",
    },
    {
      reference: "uio654",
      customer: "James Quartey",
      date: "Sep 30, 2024, 7:45 AM",
      description: "Bill Payment - September 2024",
      amount: "GH¢ 18.59",
    },
    {
      reference: "bnm741",
      customer: "Kofi Annan",
      date: "Oct 8, 2024, 3:00 PM",
      description: "Bill Payment - October 2024",
      amount: "GH¢ 24.37",
    },
    {
      reference: "lkj951",
      customer: "Linda Yeboah",
      date: "Nov 14, 2024, 10:30 AM",
      description: "Bill Payment - November 2024",
      amount: "GH¢ 29.74",
    },
    {
      reference: "pou753",
      customer: "Michael Obeng",
      date: "Dec 25, 2024, 1:00 PM",
      description: "Bill Payment - December 2024",
      amount: "GH¢ 55.12",
    },
    {
      reference: "qaz852",
      customer: "Nana Ama",
      date: "Jan 20, 2024, 9:15 AM",
      description: "Bill Payment - January 2024",
      amount: "GH¢ 21.09",
    },
    {
      reference: "wsx147",
      customer: "Opoku Mensah",
      date: "Feb 7, 2024, 4:45 PM",
      description: "Bill Payment - February 2024",
      amount: "GH¢ 20.00",
    },
    {
      reference: "edc258",
      customer: "Paul Agyemang",
      date: "Mar 12, 2024, 8:00 AM",
      description: "Bill Payment - March 2024",
      amount: "GH¢ 25.63",
    },
    {
      reference: "rfv369",
      customer: "Queen Owusu",
      date: "Apr 27, 2024, 5:30 PM",
      description: "Bill Payment - April 2024",
      amount: "GH¢ 33.78",
    },
    {
      reference: "tgb741",
      customer: "Robert Quansah",
      date: "May 19, 2024, 6:15 PM",
      description: "Bill Payment - May 2024",
      amount: "GH¢ 28.92",
    },
    {
      reference: "yhn963",
      customer: "Samantha Appiah",
      date: "Jun 1, 2024, 2:45 PM",
      description: "Bill Payment - June 2024",
      amount: "GH¢ 32.14",
    },
    {
      reference: "ujm357",
      customer: "Thomas Addo",
      date: "Jul 29, 2024, 1:30 PM",
      description: "Bill Payment - July 2024",
      amount: "GH¢ 26.87",
    },
    {
      reference: "ikn852",
      customer: "Ursula Afriyie",
      date: "Aug 11, 2024, 4:20 PM",
      description: "Bill Payment - August 2024",
      amount: "GH¢ 30.50",
    },
    {
      reference: "bvg741",
      customer: "Victor Ofori",
      date: "Sep 23, 2024, 10:30 AM",
      description: "Bill Payment - September 2024",
      amount: "GH¢ 22.10",
    },
  ];

  console.log(limit, start);
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.currentTarget.value);
    setLimit(newLimit);
    appendQuery("limit", String(newLimit));
  };

  const handlePreviousPage = () => {
    const newStart = Math.max(start - limit, 0);
    setStart(newStart);
    appendQuery("start", String(newStart));
  };

  const handleNextPage = () => {
    const newStart = start + limit;
    setStart(newStart);
    appendQuery("start", String(newStart));
  };

  const table_columns = [
    {
      title: "Reference",
      span: "col-span-2",
      ref: "reference",
    },
    {
      title: "Customer",
      span: "col-span-4",
      ref: "customer",
    },
    {
      title: "Date",
      span: "col-span-2",
      ref: "date",
    },
    {
      title: "Description",
      span: "col-span-2",
      ref: "description",
    },
    {
      title: "Amount",
      span: "col-span-2",
      ref: "amount",
    },
  ];
  const stats = [
    {
      h1: "Today",
      value: "90.40",
      unit: "Gh¢",
    },
    {
      h1: "This Week",
      value: "824.43",
      unit: "Gh¢",
    },
    {
      h1: "This Month",
      value: " 342.32",
      unit: "Gh¢",
    },
    {
      h1: "Total",
      value: "23,443.00",
      unit: "Gh¢",
    },
  ];
  return (
    <div className="grid grid-cols-12  h-full gap-y-6 h-dvh">
      <div className="col-span-12 row-span-2 flex flex-col gap-6">
        <div className="flex items-center justify-between col-span-12 ">
          <h4 className="font-bold text-mantis-950 text-[2.3rem]">
            Transactions
          </h4>
        </div>
        <div className="col-span-12 grid grid-cols-4 gap-6 ">
          {stats.map((e, i) => {
            return (
              <div
                className="bg-white-50 p-6 rounded-md cursor-pointer duration-700 hover:scale-[1.05] flex flex-col justify-between"
                key={i}
              >
                <div className=" flex items-center justify-between text-mantis-950 ">
                  <h2 className="text-[0.9rem] font-semibold text-mantis-950">
                    {e.h1}
                  </h2>
                  {/* <ArrowUpRightIcon className="h-[1rem] text-mantis-950" /> */}
                </div>
                <h4 className="text-[2rem] font-bold text-mantis-950 flex items-baseline gap-2">
                  <span className="text-[0.8rem] font-normal uppercase">
                    {e.unit}
                  </span>
                  {e.value}
                </h4>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between col-span-12 ">
          <div className="relative w-72">
            <div className="absolute left-0 pl-2 h-full z-10 grid place-items-center">
              <MagnifyingGlassIcon className="h-[18px] text-white-400" />
            </div>
            <input
              placeholder="Search..."
              className=" focus:ring-mantis-950 focus:border-mantis-950  block w-full sm:text-sm border-white-300 rounded-md py-2 pl-8 relative"
            />
          </div>
          <button className="text-white-50 bg-ebony-950 flex items-center gap-2  px-9 py-[0.5rem] rounded-md">
            <PlusIcon className="h-[18px] text-white-50" />
            <p> Add Meter</p>
          </button>
        </div>
      </div>

      <div className="col-span-12">
        <div className="bg-white-50 pt-4  grid grid-cols-12  rounded-md border-[1px] border-mountain-mist-100 ">
          {/*  */}
          {/* header */}
          <div className=" h-fit col-span-12 flex items-center border-b-[1px] pb-2   border-mountain-mist-100 px-4">
            <div className="h-fit flex-[1] ">
              <Checkbox
                checked={enabled}
                onChange={setEnabled}
                className="group block h-[1rem] w-[1rem] rounded border bg-white-50 data-[checked]:bg-mantis-950"
              >
                <svg
                  className="stroke-white-50 opacity-0 group-data-[checked]:opacity-100"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
            </div>

            <div className="flex-[16] grid-cols-12 grid gap-2 ">
              {table_columns.map((e: HeadersProps, i: number) => {
                return <TableHeader title={e.title} span={e.span} key={i} />;
              })}
            </div>

            <div className="flex-[2] "></div>
          </div>
          {dummyData?.slice(start, start + limit).map((e, i) => {
            return (
              <div
                className={`
                h-fit
                cursor-pointer
                hover:bg-mountain-mist-50
                duration-200
                col-span-12  flex items-center     ${
                  i != dummyData.length - 1 &&
                  "border-mountain-mist-100 border-b-[1px]"
                } px-4`}
                key={i}
              >
                <div className="h-fit flex-[1] ">
                  <Checkbox
                    checked={enabled}
                    onChange={setEnabled}
                    className="group block h-[1rem] w-[1rem] rounded border bg-white-50 data-[checked]:bg-mantis-950"
                  >
                    <svg
                      className="stroke-white-50 opacity-0 group-data-[checked]:opacity-100"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Checkbox>
                </div>

                <div className="flex-[16] grid-cols-12 grid gap-2 py-2 ">
                  {table_columns?.map((head, index) => {
                    return (
                      <div
                        key={index}
                        className={`${head.span} flex-1 flex items-center px-2`}
                      >
                        <p className="text-[0.86rem] text-mountain-mist-500">
                          {e[head?.ref]}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex-[2] grid place-items-center cursor-pointer ">
                  <div className="hover:bg-mountain-mist-100 w-fit cursor-pointer p-1 rounded-md duration-500">
                    <EllipsisHorizontalIcon className="text-mountain-mist-950 h-[1.2rem]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pt-4 flex items-center justify-end gap-6">
          <div className="flex items-center gap-2">
            <p className="text-[0.9rem]">Rows per page</p>
            <select
              className="focus:ring-mantis-950  py-[0.1rem] inset-0   rounded-md focus:border-mountain-mist-100"
              value={limit}
              onChange={handleLimitChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
            </select>
          </div>
          <div>
            <p className="font-semibold text-mountain-mist-600">
              Page {Math.floor(start / limit + 1)} of{" "}
              {Math.ceil(dummyData.length / limit)}
            </p>
          </div>

          <div className="flex gap-1">
            <button
              className={`grid place-items-center border-mountain-mist-100 border-[1px]  rounded  ${
                start === 0
                  ? ""
                  : "focus:bg-white-50 hover:bg-mountain-mist-100"
              }`}
              disabled={start === 0}
              onClick={handlePreviousPage}
            >
              <ChevronDoubleLeftIcon className="text-mountain-mist-800 h-7 p-1" />
            </button>
            <button
              className={`grid place-items-center border-mountain-mist-100 border-[1px]  rounded  ${
                start === 0
                  ? ""
                  : "focus:bg-white-50 hover:bg-mountain-mist-100"
              }`}
              disabled={start === 0}
              onClick={handlePreviousPage}
            >
              <ChevronLeftIcon className="text-mountain-mist-800 h-7 p-1" />
            </button>

            <button
              className={`grid place-items-center border-mountain-mist-100 border-[1px]  rounded  ${
                start + limit >= dummyData.length
                  ? ""
                  : "focus:bg-white-50 hover:bg-mountain-mist-100"
              }`}
              disabled={start + limit >= dummyData.length}
              onClick={handleNextPage}
            >
              <ChevronRightIcon className="text-mountain-mist-800 h-7 p-1" />
            </button>
            <button
              className={`grid place-items-center border-mountain-mist-100 border-[1px]  rounded  ${
                start + limit >= dummyData.length
              } ? '': 'focus:bg-white-50 hover:bg-mountain-mist-100'}`}
              disabled={start + limit >= dummyData.length}
              onClick={handleNextPage}
            >
              <ChevronDoubleRightIcon className="text-mountain-mist-800 h-7 p-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
