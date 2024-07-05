import React, { useState } from "react";
import Table from "../../components/transactions/table";

const Transactions = () => {
  const [open, setOpen] = useState(false);
  const [sidebar, OpenSideBar] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };
  return (
    <div>
      <Table />
    </div>
  );
};

export default Transactions;
