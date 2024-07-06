import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/20/solid";
import { IProps as HeadersProps } from "./TableHeaderItem";
import { useEffect, useState } from "react";
import useUrlState from "../../../hooks/useUrlState";
import { isNumeric } from "../../../utils";
import Pagination from "./Pagination";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
type colType = "text" | "element";

export interface IAction {
  title: string;
  action: (id?: string) => void;
  variant?: "danger" | "regular";
  icon: React.ReactNode;
}
export interface HeadersPropsWithRef extends HeadersProps {
  ref: string;
  type?: colType | null;
  component?: (value: string) => React.ReactNode;
}
interface props {
  headers: HeadersPropsWithRef[];
  data: any[];
  addTitle: string;
  onClickAdd: () => void;
  actions: IAction[];
}
const TableComponent = ({
  data,
  headers,
  addTitle,
  onClickAdd,
  actions,
}: props) => {
  const { appendQuery, getQueryValue, deleteQuery } = useUrlState();

  useEffect(() => {
    if (!isNumeric(getQueryValue("limit"))) {
      deleteQuery("limit");
    }
    if (
      !isNumeric(getQueryValue("start")) ||
      Number(getQueryValue("start")) > data?.length
    ) {
      deleteQuery("start");
    }
  }, []);
  const [start, setStart] = useState(() => {
    const value = getQueryValue("start");
    return value == null || !isNumeric(value) || Number(value) > data?.length
      ? 0
      : Number(value);
  });

  const [limit, setLimit] = useState(() => {
    const value = getQueryValue("limit");
    return value == null || !isNumeric(value) ? 7 : Number(value);
  });

  const [enabled, setEnabled] = useState(false);

  const handleFirstPage = () => {
    setStart(0);
    appendQuery("start", "0");
  };
  const handleLastPage = () => {
    const lastIndex = Math.max(data?.length - limit, 0);
    setStart(lastIndex);
    appendQuery("start", String(lastIndex));
  };
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.currentTarget.value);
    setLimit(newLimit);
    appendQuery("limit", String(newLimit));

    setStart((oldStart) => {
      const topRowIndex = oldStart;
      const newStart = Math.floor(topRowIndex / newLimit) * newLimit;
      appendQuery("start", String(newStart));
      return newStart;
    });
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

  return (
    <div className="grid grid-cols-12  h-full gap-y-6">
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
        <button
          className="text-white-50 bg-mantis-950 flex items-center gap-2  px-5 py-[0.5rem] rounded-md"
          onClick={onClickAdd}
        >
          <PlusIcon className="h-[18px] text-white-50" />
          <p> Add {addTitle}</p>
        </button>
      </div>
      <div className="col-span-12">
        <div className="bg-white-50 pt-2  grid grid-cols-12  rounded-md border-[1px] border-mountain-mist-100 ">
          <TableHeader
            allSelected={enabled}
            setAllSelected={setEnabled}
            table_columns={headers}
          />
          {data?.slice(start, start + limit).map((e, i) => {
            return (
              <TableRow
                actions={actions}
                allSelected={enabled ? true : null}
                index={i}
                totalNumberOfItems={data?.length}
                tableColumns={headers}
                rowData={e}
                key={i}
              />
            );
          })}
        </div>
        <Pagination
          limit={limit}
          handleLimitChange={handleLimitChange}
          start={start}
          totalNumberOfItems={data?.length}
          handleFirstPage={handleFirstPage}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          handleLastPage={handleLastPage}
        />
      </div>
    </div>
  );
};

export default TableComponent;
