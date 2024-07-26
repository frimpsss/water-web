import { XMarkIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import { useMutation } from "react-query";
import Spinner from "../../shared/Spinner";
import { toggleTariffStatus } from "../../../api/mutation/tariffs";
import { isAxiosError } from "axios";
import { toast } from "sonner";

const ToggleTariffStatusModal = ({
  data,
  closeModal,
}: {
  data: any;
  closeModal: () => void;
}) => {
  const [wasApprovedClicked, setWasApprovedClicked] = useState<
    "none" | "approve" | "reject"
  >("none");

  const { isLoading, mutate } = useMutation({
    mutationFn: toggleTariffStatus,
    mutationKey: ["toggle-tariff"],
    onSuccess: () => {
      toast.success("Operation succesfull");
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        toast.error(err.response?.data?.message || "An error occured");
      } else {
        toast.error("An error occured");
      }
    },
    onSettled: () => {
      closeModal();
    },
  });
  return (
    <div className="w-[35vw]">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-ebony-950 font-bold text-[1.4rem] leading-[2.4rem]">
            Toggle Tariff Status
          </h4>
          <p className="text-mountain-mist-300 text-[1rem] font-light">
            Modify status of selected tariff.
          </p>
        </div>
        <button
          className="border-[#000] border-[2px] rounded-md"
          onClick={closeModal}
        >
          <XMarkIcon className="text-[#000] h-5" color="#000000" />
        </button>
      </div>
      <div className="mt-6">
        <p className="text-[1rem]">
          By toggling the status of{" "}
          <span className="inline-block bg-mountain-mist-100 px-1 rounded text-mountain-mist-700">
            {data?.name}
          </span>{" "}
          You will change the status from
          <span className="inline-block bg-mountain-mist-100 px-1 rounded text-mountain-mist-700">
            {data?.status}
          </span>{" "}
          to{" "}
          <span className="inline-block bg-mountain-mist-100 px-1 rounded text-mountain-mist-700">
            {" "}
            {data?.status == "INACTIVE" ? " ACTIVE" : " INACTIVE"}
          </span>
        </p>

        {/* btns */}
        <div className="w-full grid grid-cols-4 gap-4 mt-6">
          <div className="col-span-2"></div>
          <button
            disabled={isLoading}
            className="text-white-50 bg-error-text/90 hover:bg-error-text duration-300 px-3 py-2 rounded-md font-bold grid place-items-center"
            onClick={() => {
              //   setWasApprovedClicked("reject");
              // mutate({ id: data?._id, accept: false });
              closeModal();
            }}
          >
            {isLoading && wasApprovedClicked == "reject" ? (
              <Spinner stroke="#fff" />
            ) : (
              "Cancel"
            )}
          </button>
          <button
            disabled={isLoading}
            className="text-white-50 bg-success-text/90 hover:bg-success-text duration-300 px-3 py-2 rounded-md font-bold grid place-items-center"
            onClick={() => {
              setWasApprovedClicked("approve");
              mutate({ id: data?._id });
            }}
          >
            {isLoading && wasApprovedClicked == "approve" ? (
              <Spinner stroke="#fff" />
            ) : (
              "Toggle"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleTariffStatusModal;
