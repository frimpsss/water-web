import { useQuery } from "react-query";
import TableComponent, {
  HeadersPropsWithRef,
} from "../../components/shared/table/TableComponent";
import { useState } from "react";
import { getAllMessages } from "../../api/queries/messages";
import { formatDate } from "../../utils";
import CreateMessageModal from "../../components/messages/CreateMessageModal";
import Modal from "../../components/shared/Modal";

const Messages = () => {
  const [tableData, setTableData] = useState([]);
  const [activeModal, setActiveModal] = useState<"" | "create">("");
  const { isFetching, refetch } = useQuery({
    queryFn: getAllMessages,
    queryKey: "get-all-messages",
    onSuccess(data) {
      setTableData(data.data.data);
    },
  });
  const tableHeaders: HeadersPropsWithRef[] = [
    {
      ref: "title",
      span: "col-span-3",
      title: "Title",
      type: "text",
    },
    {
      ref: "message",
      span: "col-span-5",
      title: "Title",
      type: "text",
    },
    {
      ref: "createdAt",
      span: "col-span-2",
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
      ref: "notificationType",
      span: "col-span-2",
      title: "Notification Type",
      type: "text",
    },
  ];
  return (
    <div className="col-span-12 row-span-2  flex flex-col gap-6 ">
      <div className="flex items-center justify-between col-span-12">
        <h4 className="font-bold text-mantis-950 text-[2.3rem]">Messages</h4>
      </div>
      <div>
        <TableComponent
          headers={tableHeaders}
          data={tableData}
          actions={[]}
          onClickAdd={() => {
            setActiveModal("create");
          }}
          loading={isFetching}
          addTitle="Send Message"
        />
      </div>

      <Modal
        isOpen={activeModal == "create"}
        toogleIsOpen={() => {
          setActiveModal("");
        }}
      >
        <CreateMessageModal
          closeModal={() => {
            refetch();
            setActiveModal("");
          }}
        />
      </Modal>
    </div>
  );
};

export default Messages;
