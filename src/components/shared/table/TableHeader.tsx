import { Checkbox } from "@headlessui/react";
import { HeadersPropsWithRef } from "./table";
import TableHeaderItem from "./TableHeaderItem";
interface props {
  allSelected: boolean;
  setAllSelected: (initialState: boolean | (() => boolean)) => void;
  table_columns: HeadersPropsWithRef[];
}
const TableHeader = ({ allSelected, setAllSelected, table_columns }: props) => {
  return (
    <div className=" h-fit col-span-12 flex items-center border-b-[1px] pb-2   border-mountain-mist-100 px-4">
      <div className="h-fit flex-[1] ">
        <Checkbox
          checked={allSelected}
          onChange={setAllSelected}
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
        {table_columns.map((e: HeadersPropsWithRef, i: number) => {
          return <TableHeaderItem title={e.title} span={e.span} key={i} />;
        })}
      </div>

      <div className="flex-[2] "></div>
    </div>
  );
};

export default TableHeader;
