import { useQuery } from "react-query";
import { getCurrentTarffis } from "../../api/queries/tariffs";
import { useState } from "react";
import { InfoCircle } from "iconsax-react";
import Modal from "../../components/shared/Modal";
import ViewTariffDetailsModal from "../../components/tariffs/modal/ViewTariffDetailsModal";
import CurrentTariffsSkeleton from "../../components/tariffs/CurrentTariffsSkeleton";

const Tarrifs = () => {
  const [currentTariffs, setCurrentTariffs] = useState([]);
  const [open, setOpen] = useState<boolean>(false);
  const [tariffModalData, setTariffModalData] = useState(null);
  const { isFetching } = useQuery({
    queryFn: getCurrentTarffis,
    queryKey: "current-tariffs",
    onSuccess(data) {
      console.log(data.data?.data);
      setCurrentTariffs(data.data?.data);
    },
    onError(err) {
      console.log(err);
    },
  });
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
                  setOpen(true);
                  setTariffModalData(e)
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
        </div>
      ) : (
        <CurrentTariffsSkeleton />
      )}

      <Modal
        isOpen={open}
        toogleIsOpen={() => {
          setOpen(false);
        }}
      >
        <ViewTariffDetailsModal
          data={tariffModalData}
          closeModal={() => {
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Tarrifs;
