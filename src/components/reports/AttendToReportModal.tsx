import React from "react";
import { useMutation } from "react-query";
import Spinner from "../shared/Spinner";
import { useFormik } from "formik";
import { attendToReport } from "../../api/mutation/report";
import TextArea from "../shared/TextArea";
import { toast } from "sonner";
import { isAxiosError } from "axios";

const AttendToReportModal = ({
  closeModal,
  data,
}: {
  closeModal: () => void;
  data: any;
}) => {
  const { isLoading, mutate } = useMutation({
    mutationFn: attendToReport,
    onSuccess: () => {
      toast.success("Opereation succesful");
    },
    onError: (er: any) => {
      if (isAxiosError(er)) {
        toast.error(er.response.data.message);
      } else {
        toast.error(er.response.data.message);
      }
    },
    onSettled: () => {
        closeModal()
    },
  });
  const { ...form } = useFormik({
    initialValues: {
      remarks: "",
    },
    onSubmit(values, formikHelpers) {
      Object.keys(form.values)?.map((e) => {
        form.setFieldTouched(e, true);
      });
      if (form.isValid && form?.dirty) {
        mutate({
          remarks: values.remarks,
          reportId: data?._id as string,
        });
      }
    },
  });
  return (
    <div className="w-[35vw] p-2">
      <div className=" border-b-[1px] border-mountain-mist-200">
        <h4 className="text-ebony-950 font-bold text-[1.6rem] leading-[2.4rem]">
          Attend to Report
        </h4>
        <p className="text-mountain-mist-300 text-[0.99rem] font-extralight">
          Assign report to someone.
        </p>
      </div>

      <div className="my-6">
        <TextArea
          id={"remarks"}
          type={"number"}
          placeholder={"Enter any remarks"}
          label={"Remarks"}
          {...form}
        />
      </div>

      <div className="mt-6 border-mountain-mist-200 gap-4 text-white-50  font-semibold grid grid-cols-5 pt-4">
        <div className="col-span-3"></div>
        <button
          className="bg-ebony-950 py-2 rounded-md"
          onClick={() => {
            closeModal();
          }}
        >
          cancel
        </button>
        <button
          className="bg-mantis-950 rounded-md"
          onClick={() => {
            form.handleSubmit();
          }}
        >
          {isLoading ? <Spinner stroke="#fff" /> : "create"}
        </button>
      </div>
    </div>
  );
};

export default AttendToReportModal;
