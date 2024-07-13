import { useQuery } from "react-query";
import { getAllUser } from "../../api/queries/users";
import Table, {
  HeadersPropsWithRef,
  IAction,
} from "../../components/shared/table/TableComponent";
import { useState } from "react";
import VerificationStatus from "../../components/customers/VerificationStatus";
import Modal from "../../components/shared/Modal";
import VerifyModal from "../../components/customers/modals/VerifyModal";
import { Edit, Eye, Trash, Verify } from "iconsax-react";
import ViewModal from "../../components/customers/modals/ViewModal";
import AssignMeterModal from "../../components/customers/modals/AssignMeterModal";

const Customers = () => {
  const [showVerifyModal, setShowVerifyModal] = useState<boolean>(false);
  const [data, setUserData] = useState([]);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [showAssignModal, setShowAssignModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState();

  const { refetch, isLoading, isFetching } = useQuery("all-user", {
    queryFn: getAllUser,
    onSuccess(data) {
      setUserData(data?.data?.data);
    },
  });

  const tableHeaders: HeadersPropsWithRef[] = [
    {
      ref: "name",
      span: "col-span-4",
      title: "Name",
      type: "text",
    },
    {
      ref: "email",
      span: "col-span-3",
      title: "Email",
      type: "text",
    },
    {
      ref: "phoneNumber",
      span: "col-span-3",
      title: "Phone number",
      type: "text",
    },
    {
      ref: "verificationStage",
      span: "col-span-2",
      title: "Verification Status",
      type: "element",
      component(value) {
        return <VerificationStatus value={value} />;
      },
    },
  ];
  const table_actions: IAction[] = [
    {
      title: "View",
      action(id) {
        setModalData(id);
        setShowViewModal(true);
      },
      icon: <Eye size="16" color="#000" variant="Broken" />,
    },
    {
      title: "Verify",
      action(id) {
        setModalData(id);
        setShowVerifyModal(true);
      },
      icon: <Verify size="16" color="#000" variant="Broken" />,
    },
    {
      title: "Assign meter",
      action(id) {
        setModalData(id);
        setShowAssignModal(true);
      },
      icon: <Edit size="16" color="#000" variant="Broken" />,
    },
  ];

  return (
    <div>
      <Table
        loading={isFetching}
        headers={tableHeaders}
        data={data}
        addTitle={"User"}
        actions={table_actions}
      />
      <Modal isOpen={showVerifyModal} toogleIsOpen={setShowVerifyModal}>
        <VerifyModal
          data={modalData}
          closeModal={() => {
            refetch();
            setShowVerifyModal(false);
          }}
        />
      </Modal>
      <Modal isOpen={showViewModal} toogleIsOpen={setShowViewModal}>
        <ViewModal
          data={modalData}
          closeModal={() => {
            setShowViewModal(false);
          }}
        />
      </Modal>

      <Modal isOpen={showAssignModal} toogleIsOpen={setShowAssignModal}>
        <AssignMeterModal
          data={modalData}
          closeModal={() => {
            refetch();
            setShowAssignModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Customers;
