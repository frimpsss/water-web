import { useState } from "react";
import TransactionsStats from "../../components/transactions/stats";
import Table, {
  HeadersPropsWithRef,
  IAction,
} from "../../components/shared/table/TableComponent";
import Sidebar from "../../components/shared/Sidebar";
import { Edit, Eye, Trash } from "iconsax-react";
import { dummy_txns } from "../../utils/data";

const Transactions = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const tableHeaders: HeadersPropsWithRef[] = [
    {
      ref: "ref",
      span: "col-span-2",
      title: "Reference",
      type: "text",
    },
    {
      ref: "name",
      span: "col-span-3",
      title: "Name",
      type: "text",
    },
    {
      ref: "description",
      span: "col-span-3",
      title: "Description",
      type: "text",
    },
    {
      ref: "date",
      span: "col-span-2",
      title: "Date",
      type: "text",
    },
    {
      ref: "amount",
      span: "col-span-2",
      title: "Amount",
      type: "text",
    },
  ];

  const table_actions: IAction[] = [
    {
      title: "View",
      action(data) {
        setData(data);
      },
      icon: <Eye size="16" color="#000" variant="Broken" />,
    },
    {
      title: "Edit",
      action(id) {
        window.alert(id);
      },
      icon: <Edit size="16" color="#000" variant="Broken" />,
    },
    {
      title: "Delete",
      action(id) {
        window.alert(id);
      },
      icon: <Trash size="16" color="#dc2626" variant="Broken" />,
      variant: "danger",
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <TransactionsStats />
      <Table
        loading={false}
        actions={table_actions}
        headers={tableHeaders}
        data={dummy_txns}
        onClickAdd={() => {
          setOpen(true);
        }}
      />

      <Sidebar
        isOpen={open}
        toggleSidebar={() => {
          setOpen(false);
        }}
      >
        <p>Add Transaction</p>
      </Sidebar>
    </div>
  );
};

export default Transactions;
