import { useState } from "react";
import TransactionsStats from "../../components/transactions/stats";
import Table, {
  HeadersPropsWithRef,
  IAction,
} from "../../components/shared/table/TableComponent";
import Sidebar from "../../components/shared/Sidebar";
import { Eye } from "iconsax-react";
import { useQuery } from "react-query";
import { getAllTxns } from "../../api/queries/txns";
import {
  formatDate,
  getMonthAndYear,
  getTotalAmountPaid,
  monthNames,
} from "../../utils";

const Transactions = () => {
  const [open, setOpen] = useState(false);
  const [txnStats, setTxnStats] = useState<{
    totalAmountPaidToday: number;
    totalAmountPaidThisWeek: number;
    totalAmountPaidThisMonth: number;
    totalAmountPaidOverall: number;
  }>({
    totalAmountPaidOverall: 0,
    totalAmountPaidThisMonth: 0,
    totalAmountPaidThisWeek: 0,
    totalAmountPaidToday: 0,
  });
  const [data, setData] = useState();
  const { isFetching, refetch } = useQuery({
    queryFn: getAllTxns,
    queryKey: "get-all-txns",
    onError: (err) => {
      console.error(err);
    },
    onSuccess(data) {
      console.log(data.data.data);
      setData(data.data.data);
      setTxnStats(getTotalAmountPaid(data.data.data));
    },
  });
  const tableHeaders: HeadersPropsWithRef[] = [
    {
      ref: "txnData.transactionRef.trxref",
      span: "col-span-2",
      title: "Reference",
      type: "text",
    },
    {
      ref: "userId.name",
      span: "col-span-3",
      title: "Name",
      type: "text",
    },
    {
      ref: "billId.billingPeriodStart",
      span: "col-span-3",
      title: "Description",
      type: "element",
      component(value) {
        return (
          <p className="text-[0.86rem] text-mountain-mist-500">
            Bill payment for {monthNames[getMonthAndYear(value).month]} -{" "}
            {getMonthAndYear(value).year}
          </p>
        );
      },
    },
    {
      ref: "createdAt",
      span: "col-span-2",
      title: "Date",
      type: "element",
      component: (value) => {
        return (
          <p className="text-[0.86rem] text-mountain-mist-500">
            {formatDate(new Date(value))}
          </p>
        );
      },
    },
    {
      ref: "billId.totalAmountDue",
      span: "col-span-2",
      title: "Amount",
      type: "element",
      component: (value) => {
        return (
          <p className="text-[0.86rem] text-mountain-mist-500">
            GHS {parseInt(value).toFixed(2)}
          </p>
        );
      },
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
    // {
    //   title: "Edit",
    //   action(id) {
    //     window.alert(id);
    //   },
    //   icon: <Edit size="16" color="#000" variant="Broken" />,
    // },
    // {
    //   title: "Delete",
    //   action(id) {
    //     window.alert(id);
    //   },
    //   icon: <Trash size="16" color="#dc2626" variant="Broken" />,
    //   variant: "danger",
    // },
  ];
  return (
    <div className="flex flex-col gap-6">
      <TransactionsStats {...txnStats} loading={isFetching} />
      <Table
        loading={isFetching}
        actions={[]}
        headers={tableHeaders}
        data={data}
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
