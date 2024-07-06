import { Checkbox } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { HeadersPropsWithRef, IAction } from "./TableComponent";
interface props {
  index: number;
  totalNumberOfItems: number;
  tableColumns: HeadersPropsWithRef[];
  rowData: any;
  allSelected?: boolean | null;
  actions: IAction[];
}
const TableRow = ({
  index,
  totalNumberOfItems,
  tableColumns,
  rowData,
  allSelected,
  actions,
}: props) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (allSelected) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [allSelected]);
  return (
    <div
      className={`
        py-1
    h-fit
    cursor-pointer
    hover:bg-mountain-mist-50
    ${enabled && " bg-mountain-mist-50 "}
    duration-200
    col-span-12  flex items-center     ${
      index != totalNumberOfItems - 1 &&
      "border-mountain-mist-100 border-b-[1px]"
    } px-4`}
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
        {tableColumns?.map((head, Iindex) => {
          const colType = head.type ?? "text";
          const value = rowData?.[head.ref] ?? "N/A";
          return (
            <div
              key={Iindex}
              className={`${head.span} flex-1 flex items-center px-2`}
            >
              {colType == "text" ? (
                <p className="text-[0.86rem] text-mountain-mist-500">{value}</p>
              ) : (
                head.component && head.component(value)
              )}
            </div>
          );
        })}
      </div>

      <div className="flex-[2] grid place-items-center cursor-pointer ">
        <Menu>
          <div className="hover:bg-mountain-mist-100 w-fit cursor-pointer p-1 rounded-md duration-500">
            <MenuButton as="div">
              <EllipsisHorizontalIcon className="text-mountain-mist-950 h-[1.2rem]" />
            </MenuButton>
            <MenuItems
              anchor="bottom end"
              as="div"
              className={
                "bg-white-50 pt-3 px-[2px] pb-[2px] rounded-md  border-mountain-mist-200 border-[0.8px] mt-[7px] shadow-lg"
              }
            >
              <p className="font-semibold text-[0.9rem] pr-[7rem] mb-2 px-2">
                Actions
              </p>
              {actions.map((item, inx) => {
                return (
                  <MenuItem
                    key={inx}
                    as={"div"}
                    className={"hover:bg-mountain-mist-50 rounded-md"}
                    onClick={() => {
                      item.action("hi");
                    }}
                  >
                    <div className="cursor-pointer flex items-center gap-2 p-2   ">
                      <div>{item.icon}</div>
                      <p
                        className={`text-[0.8rem]  ${
                          item.variant == "danger"
                            ? "text-[#dc2626]"
                            : "text-mountain-mist-600"
                        }`}
                      >
                        {item.title}
                      </p>
                    </div>
                  </MenuItem>
                );
              })}
            </MenuItems>
          </div>
        </Menu>
      </div>
    </div>
  );
};

export default TableRow;
