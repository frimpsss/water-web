import React, { useState } from "react";
import TableComponent, {
  HeadersPropsWithRef,
  IAction,
} from "../../components/shared/table/TableComponent";
import { Eye } from "iconsax-react";
import { useQuery } from "react-query";
import { getAllBills } from "../../api/queries/bills";
import { getMonthAndYear, monthNames } from "../../utils";
import Modal from "../../components/shared/Modal";
import GenerateBillModal from "../../components/bills/modals/GenerateBillModal";
import ViewBillModal from "../../components/bills/modals/ViewBillModal";

const Billing = () => {
  const [data, setTableData] = useState([]);
  const [modalData, setModalData] = useState({});
  const [activeModal, setActiveModal] = useState<
    "" | "generate-bills" | "view-bill"
  >("");
  const { isFetching, refetch } = useQuery({
    queryFn: getAllBills,
    queryKey: ["all-bills"],
    onSuccess: (data) => {
      setTableData(data?.data?.data);
    },
  });
  const tableHeaders: HeadersPropsWithRef[] = [
    {
      ref: "meterId.userId.name",
      span: "col-span-4",
      title: "User",
      type: "text",
    },
    {
      ref: "billingPeriodEnd",
      span: "col-span-4",
      title: "Billing Period",
      type: "element",
      component(value) {
        return (
          <p className="text-[0.86rem] text-mountain-mist-500">
            {monthNames[getMonthAndYear(value).month - 1]} -{" "}
            {getMonthAndYear(value).year}
          </p>
        );
      },
    },
    {
      ref: "totalAmountDue",
      span: "col-span-2",
      title: "Amount",
      type: "element",
      component(value) {
        return (
          <p className="text-[0.86rem] text-mountain-mist-500">
            Gh¢ {parseInt(value).toFixed(2)}
          </p>
        );
      },
    },
    {
      ref: "status",
      span: "col-span-2",
      title: "Payment Status",
      type: "text",
    },
  ];
  const table_actions: IAction[] = [
    {
      title: "View",
      action(data) {
        // setData(data);
        setModalData(data);
        setActiveModal("view-bill");
      },
      icon: <Eye size="16" color="#000" variant="Broken" />,
    },
  ];
  return (
    <div className="col-span-12 row-span-2  flex flex-col gap-6 ">
      <div className="flex items-center justify-between col-span-12">
        <h4 className="font-bold text-mantis-950 text-[2.3rem]">Bills</h4>
      </div>

      <div>
        <TableComponent
          addTitle="Generate Bills"
          headers={tableHeaders}
          data={data}
          actions={table_actions}
          loading={isFetching}
          onClickAdd={() => {
            setActiveModal("generate-bills");
          }}
        />
      </div>

      <Modal
        isOpen={activeModal == "generate-bills"}
        toogleIsOpen={() => {
          setActiveModal("");
        }}
      >
        <GenerateBillModal
          closeModal={() => {
            refetch();
            setModalData({});
            setActiveModal("");
          }}
        />
      </Modal>
      <Modal
        isOpen={activeModal == "view-bill"}
        toogleIsOpen={() => {
          setActiveModal("");
        }}
      >
        <ViewBillModal
          closeModal={() => {
            setActiveModal("");
          }}
          data={modalData}
        />
      </Modal>
    </div>
  );
};

export default Billing;
