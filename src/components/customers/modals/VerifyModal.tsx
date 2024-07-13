import { XMarkIcon } from "@heroicons/react/20/solid";
import { useMutation } from "react-query";
import { verifyUser } from "../../../api/mutation/users";
import { toast } from "sonner";
import { useState } from "react";
import Spinner from "../../shared/Spinner";
import VerificationStatus from "../VerificationStatus";

const VerifyModal = ({
  data,
  closeModal,
}: {
  data: any;
  closeModal: () => void;
}) => {
  const [wasApprovedClicked, setWasApprovedClicked] = useState<
    "none" | "approve" | "reject"
  >("none");
  const { mutate, isLoading } = useMutation({
    mutationFn: verifyUser,
    onSuccess: (d) => {
      toast.success(`${data?.name} verified succesfully`);
    },
    onError: (error: any) => {
      toast.error(error?.message);
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
            Verify Customer
          </h4>
          <p className="text-mountain-mist-300 text-[1rem] font-light">
            Modify existing customer data.
          </p>
        </div>
        <button
          className="border-[#000] border-[2px] rounded-md"
          onClick={closeModal}
        >
          <XMarkIcon className="text-[#000] h-5" color="#000000" />
        </button>
      </div>
      {data?.verificationStage == "PENDING" ? (
        <div className="mt-6">
          <p className="text-[1rem]">
            By verifying a{" "}
            <span className="inline-block bg-mountain-mist-100 px-1 rounded text-mountain-mist-700">
              {data?.name}
            </span>{" "}
            with email{" "}
            <span className="inline-block bg-mountain-mist-100 px-1 rounded text-mountain-mist-700">
              {data?.email}
            </span>
            . They are allowed access the system.{" "}
          </p>

          <p className="text-error-text font-medium my-6">
            Note: This action is irreversible
          </p>

          {/* btns */}
          <div className="w-full grid grid-cols-4 gap-4">
            <div className="col-span-2"></div>
            <button
              disabled={isLoading}
              className="text-white-50 bg-success-text/90 hover:bg-success-text duration-300 px-3 py-2 rounded-md font-bold grid place-items-center"
              onClick={() => {
                setWasApprovedClicked("approve");
                mutate({ id: data?._id, accept: true });
              }}
            >
              {isLoading && wasApprovedClicked == "approve" ? (
                <Spinner stroke="#fff" />
              ) : (
                "Approve"
              )}
            </button>
            <button
              disabled={isLoading}
              className="text-white-50 bg-error-text/90 hover:bg-error-text duration-300 px-3 py-2 rounded-md font-bold grid place-items-center"
              onClick={() => {
                setWasApprovedClicked("reject");
                mutate({ id: data?._id, accept: false });
              }}
            >
              {isLoading && wasApprovedClicked == "reject" ? (
                <Spinner stroke="#fff" />
              ) : (
                "Reject"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-[1rem]">
            <span className="inline-block bg-mountain-mist-100 px-1 rounded text-mountain-mist-700">
              {data?.name}
            </span>{" "}
            with email{" "}
            <span className="inline-block bg-mountain-mist-100 px-1 rounded text-mountain-mist-700">
              {data?.email}
            </span>{" "}
            has already been verified
          </p>

          <div className=" grid grid-cols-6 mt-6">
            <p className="col-span-2 font-semibold">Verification Status: </p>
            <div className="col-span-2">
              <VerificationStatus value={data?.verificationStage} />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              className="text-white-50 bg-ebony-950/90 hover:bg-ebony-950 duration-500 px-3 py-2 font-bold rounded mt-6"
              onClick={() => {
                closeModal();
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyModal;
