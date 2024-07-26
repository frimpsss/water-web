import { useQuery } from "react-query";
import { getAllTarffis, getCurrentTarffis } from "../../api/queries/tariffs";
import { useState } from "react";
import { Add, Edit, Eye, InfoCircle, ReceiptEdit, Trash } from "iconsax-react";
import Modal from "../../components/shared/Modal";
import ViewTariffDetailsModal from "../../components/tariffs/modal/ViewTariffDetailsModal";
import CurrentTariffsSkeleton from "../../components/tariffs/CurrentTariffsSkeleton";
import CreateTarrifModal from "../../components/tariffs/modal/CreateTarrifModal";
import TableComponent, {
  HeadersPropsWithRef,
  IAction,
} from "../../components/shared/table/TableComponent";
import TariffStatus from "../../components/tariffs/TariffStatus";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";
import ToggleTariffStatusModal from "../../components/tariffs/modal/ToggleTariffStatusModal";
import ModifyTariffRate from "../../components/tariffs/modal/ModifyTariffRate";
import ViewChangeLog from "../../components/tariffs/modal/ViewChangeLog";

const Tarrifs = () => {
  const [currentTariffs, setCurrentTariffs] = useState([]);
  const [activeModal, setActiveModal] = useState<
    | ""
    | "view"
    | "toggle-status"
    | "change-rate"
    | "view-change-log"
    | "create-modal"
  >("");
  const [tableData, setTableData] = useState([]);
  const [tariffModalData, setTariffModalData] = useState(null);
  const { isFetching, refetch: RefetchCurrentTariffs } = useQuery({
    queryFn: getCurrentTarffis,
    queryKey: "current-tariffs",
    onSuccess(data) {
      setCurrentTariffs(data.data?.data);
    },
    onError(err) {
      console.log(err);
    },
  });

  const { isFetching: isFetchingAllTariffs, refetch } = useQuery({
    queryFn: getAllTarffis,
    queryKey: "all tariffs",
    onSuccess(data) {
      console.log(data.data);
      setTableData(data.data?.data);
    },
    onError(err) {
      console.log(err);
    },
  });

  const table_actions: IAction[] = [
    {
      title: "View Tariff",
      action(data) {
        setTariffModalData(data);
        setActiveModal("view");
      },
      icon: <Eye size="16" color="#000" variant="Broken" />,
    },
    {
      title: "Toggle Status",
      action(data) {
        setTariffModalData(data);
        setActiveModal("toggle-status");
      },
      icon: <Edit size="16" color="#000" variant="Broken" />,
    },
    {
      title: "Adjust Rate",
      action(id) {
        setTariffModalData(id);
        setActiveModal("change-rate");
      },
      icon: <ReceiptEdit size="16" color="#000" variant="Broken" />,
    },
    {
      title: "View Change Log",
      action(id) {
        setTariffModalData(id);
        setActiveModal("view-change-log");
      },
      icon: <AdjustmentsHorizontalIcon color="#000" height={16} />,
    },
  ];
  const tableHeaders: HeadersPropsWithRef[] = [
    {
      ref: "name",
      span: "col-span-3",
      title: "Name",
      type: "text",
    },
    {
      ref: "description",
      span: "col-span-4",
      title: "Description",
      type: "text",
    },
    {
      ref: "rate",
      span: "col-span-2",
      title: "Rate",
      type: "element",
      component(value) {
        return (
          <p className="text-[0.86rem] text-mountain-mist-500">{value}%</p>
        );
      },
    },
    {
      ref: "status",
      span: "col-span-2",
      title: "Status",
      type: "element",
      component: (value) => {
        return <TariffStatus value={value} />;
      },
    },
  ];

  return (
    <div className="col-span-12 row-span-2 flex flex-col gap-6">
      <div className="flex items-center justify-between col-span-12 ">
        <h4 className="font-bold text-mantis-950 text-[2.3rem]">Tariffs</h4>
      </div>
      {!isFetching ? (
        <div className="grid grid-cols-4 col-span-12 gap-6">
          {currentTariffs?.map((e, i) => {
            return (
              <div
                onClick={() => {
                  setTariffModalData(e);
                  setActiveModal("view");
                }}
                key={i}
                className="bg-white-50 p-3 rounded-md cursor-pointer shadow-sm hover:scale-[1.01] duration-500"
              >
                <div className="px-2 pb-4 pt-2 flex items-center justify-between">
                  <h4 className="text-mantis-950 font-bold text-[1.2rem]">
                    {e.name}
                  </h4>
                  <InfoCircle size={18} color="#929292" />
                </div>
                <div className="bg-white-100/40 rounded-[0.225rem] px-4 py-6 flex flex-col items-start gap-6">
                  <p className=" text-[1.9rem] font-semibold text-ebony-950">
                    <span className="text-mountain-mist-400 text-[1rem] font-normal">
                      Rate:
                    </span>{" "}
                    {e.rate}%
                  </p>
                </div>
              </div>
            );
          })}

          <div
            className="bg-mantis-950 rounded-md grid place-items-center cursor-pointer shadow-sm hover:scale-[1.01] duration-500"
            onClick={() => {
              setActiveModal("create-modal");
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <Add color="#fff" size={30} />
              <p className="text-white-50 text-[1.2rem] font-semibold">
                Add new Tariff
              </p>
            </div>
          </div>
        </div>
      ) : (
        <CurrentTariffsSkeleton />
      )}

      <div>
        <TableComponent
          headers={tableHeaders}
          data={tableData}
          actions={table_actions}
          loading={isFetchingAllTariffs}
        />
      </div>

      <Modal
        isOpen={activeModal == "view"}
        toogleIsOpen={() => {
          setActiveModal("");
        }}
      >
        <ViewTariffDetailsModal
          data={tariffModalData}
          closeModal={() => {
            setActiveModal("");
          }}
        />
      </Modal>

      <Modal
        isOpen={activeModal == "create-modal"}
        toogleIsOpen={() => {
          setActiveModal("");
        }}
      >
        <CreateTarrifModal
          closeModal={() => {
            refetch();
            setActiveModal("");
          }}
        />
      </Modal>

      <Modal
        isOpen={activeModal == "toggle-status"}
        toogleIsOpen={() => {
          setActiveModal("");
          refetch();
          RefetchCurrentTariffs();
        }}
      >
        <ToggleTariffStatusModal
          data={tariffModalData}
          closeModal={() => {
            refetch;
            setActiveModal("");
          }}
        />
      </Modal>

      <Modal
        isOpen={activeModal == "change-rate"}
        toogleIsOpen={() => {
          setActiveModal("");
          refetch();
          RefetchCurrentTariffs();
        }}
      >
        <ModifyTariffRate
          id={tariffModalData?._id}
          closeModal={() => {
            setActiveModal("");
            refetch();
          }}
        />
      </Modal>

      <Modal
        isOpen={activeModal == "view-change-log"}
        toogleIsOpen={() => {
          setActiveModal("");
        }}
      >
        <ViewChangeLog
          data={tariffModalData}
          closeModal={() => {
            setActiveModal("");
          }}
        />
      </Modal>
    </div>
  );
};

export default Tarrifs;
