import { useQuery } from "react-query";
import TableComponent, {
  HeadersPropsWithRef,
} from "../../components/shared/table/TableComponent";
import { formatDate } from "../../utils";
import { getAllMeters } from "../../api/queries/meter";
import { useState } from "react";

const Meters = () => {
  const [data, setUserData] = useState([]);
  const { isFetching } = useQuery({
    queryKey: "all-meters",
    queryFn: getAllMeters,
    onSuccess(data) {
      setUserData(data?.data?.data);
    },
  });
  const tableHeaders: HeadersPropsWithRef[] = [
    {
      ref: "userId.name",
      span: "col-span-4",
      title: "Owner",
      type: "text",
    },
    {
      ref: "gpsAddress",
      span: "col-span-3",
      title: "GPS Address",
      type: "text",
    },
    {
      ref: "createdAt",
      span: "col-span-3",
      title: "Date Created",
      type: "element",
      component(value) {
        return (
          <p className="text-[0.86rem] text-mountain-mist-500">
            {formatDate(new Date(value))}
          </p>
        );
      },
    },
    {
      ref: "meterType",
      span: "col-span-2",
      title: "Meter Type",
      type: "text",
    },
  ];

  return (
    <div className="col-span-12 row-span-2  flex flex-col gap-6 ">
      <div className="flex items-center justify-between col-span-12">
        <h4 className="font-bold text-mantis-950 text-[2.3rem]">Meters</h4>
      </div>
      <div>
        <TableComponent
          headers={tableHeaders}
          data={data}
          loading={isFetching}
          actions={[]}
        />
      </div>
    </div>
  );
};

export default Meters;
