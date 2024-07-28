import { useState } from "react";
import TableComponent, {
  HeadersPropsWithRef,
  IAction,
} from "../../components/shared/table/TableComponent";
import { useQuery } from "react-query";
import { getAllReports } from "../../api/queries/reports";
import { formatDate } from "../../utils";
import { Edit, Eye } from "iconsax-react";
import Modal from "../../components/shared/Modal";
import ViewReportModal from "../../components/reports/ViewReportModal";
import { toast } from "sonner";
import AttendToReportModal from "../../components/reports/AttendToReportModal";

const Reports = () => {
  const [tableData, setTableData] = useState([]);
  const [modalData, setModalData] = useState({});
  const [activeModal, setActiveModal] = useState<
    "" | "attend-to" | "view-report"
  >("");
  const { isFetching, refetch } = useQuery({
    queryFn: getAllReports,
    onSettled(data) {
      setTableData(data.data.data);
    },
  });
  const tableHeaders: HeadersPropsWithRef[] = [
    {
      ref: "userId.name",
      span: "col-span-3",
      title: "Name",
      type: "text",
    },
    {
      ref: "title",
      span: "col-span-3",
      title: "Title",
      type: "text",
    },
    {
      ref: "createdAt",
      span: "col-span-3",
      title: "Date created",
      type: "element",
      component: (value) => {
        return (
          <p className="text-[0.86rem] text-mountain-mist-500">
            {value && formatDate(new Date(value))}
          </p>
        );
      },
    },
    {
      ref: "attendedTo",
      span: "col-span-2",
      title: "Attended to",
      type: "element",
      component(value) {
        return (
          <p
            className={`text-[0.89rem] px-1  ${
              value ? "text-success-text" : "text-error-text"
            }`}
          >
            {value ? "YES" : "NO"}
          </p>
        );
      },
    },
  ];
  const table_actions: IAction[] = [
    {
      title: "View",
      action(data) {
        // setData(data);
        setModalData(data);
        setActiveModal("view-report");
      },
      icon: <Eye size="16" color="#000" variant="Broken" />,
    },
    {
      title: "Assign",
      action(data) {
        // setData(data);
        if (data?.attendedTo) {
          toast.error("Already Attended to");
        } else {
          setModalData(data);
          setActiveModal("attend-to");
        }
      },
      icon: <Edit size="16" color="#000" variant="Broken" />,
    },
  ];
  return (
    <div className="col-span-12 row-span-2  flex flex-col gap-6 ">
      <div className="flex items-center justify-between col-span-12">
        <h4 className="font-bold text-mantis-950 text-[2.3rem]">Reports</h4>
      </div>

      <div>
        <TableComponent
          headers={tableHeaders}
          data={tableData}
          actions={table_actions}
          loading={isFetching}
        />
      </div>

      <Modal
        isOpen={activeModal == "view-report"}
        toogleIsOpen={() => {
          setActiveModal("");
        }}
      >
        <ViewReportModal
          data={modalData}
          closeModal={() => {
            setActiveModal("");
          }}
        />
      </Modal>
      <Modal
        isOpen={activeModal == "attend-to"}
        toogleIsOpen={() => {
          setActiveModal("");
        }}
      >
        <AttendToReportModal
          data={modalData}
          closeModal={() => {
            refetch();
            setActiveModal("");
          }}
        />
      </Modal>
    </div>
  );
};

export default Reports;
