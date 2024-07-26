import { HeadersPropsWithRef } from "../table/TableComponent";
interface props {
  table_columns: HeadersPropsWithRef[];
}
const TableSkeleton = ({ table_columns }: props) => {
  const skeletonRows = Array.from({ length: 7 });
  return (
    <div className="col-span-12 w-full grid grid-cols-12 " >
      <div className=" h-fit col-span-12 pt-2  rounded-t-md flex items-center gap-2 border-b-[1px] pb-2   border-mountain-mist-100  animate-pulse">
        <div className="h-8  flex-[1] bg-mountain-mist-100 rounded-md"></div>

        <div className="flex-[16] grid-cols-12 grid gap-2  ">
          {table_columns.map((e: HeadersPropsWithRef, i: number) => {
            return (
              <div
                className={` ${e.span} h-8 rounded bg-mountain-mist-100`}
                key={i}
              ></div>
            );
          })}
        </div>

        <div className="flex-[2] bg-mountain-mist-100 h-8 rounded-md"></div>
      </div>

      {skeletonRows.map((e, index) => {
        return (
          <div
            key={index}
            className={`
                animate-pulse py-1 h-fit ursor-pointer hover:bg-mountain-mist-50 duration-200 col-span-12  flex items-center gap-2`}
          >
            <div className="h-6  flex-[1] bg-mountain-mist-100 rounded-md"></div>

            <div className="flex-[16] grid-cols-12 grid gap-2 py-2 ">
              {table_columns?.map((head, Iindex) => {
                return (
                  <div
                    className={` ${head.span} h-6 rounded bg-mountain-mist-100`}
                  ></div>
                );
              })}
            </div>

            <div className="flex-[2] bg-mountain-mist-100 h-6 rounded-md"></div>
          </div>
        );
      })}
    </div>
  );
};

export default TableSkeleton;
