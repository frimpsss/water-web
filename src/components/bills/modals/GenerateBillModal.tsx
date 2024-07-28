import { useFormik } from "formik";
import CustomSelect from "../../shared/Select";
import { monthNames } from "../../../utils";
import { useMutation } from "react-query";
import { generateBills } from "../../../api/mutation/billing";
import Spinner from "../../shared/Spinner";
import { toast } from "sonner";
import { isAxiosError } from "axios";

const GenerateBillModal = ({ closeModal }: { closeModal: () => void }) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: generateBills,
    mutationKey: ["generate-bills"],
    onSuccess: (data) => {
      toast.success("Bills generated successfully");
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An error occured");
      }
    },
    onSettled: () => {
      closeModal();
    },
  });
  const { ...form } = useFormik({
    initialValues: {
      month: "",
    },
    onSubmit(values, formikHelpers) {
      Object.keys(form.values)?.map((e) => {
        form.setFieldTouched(e, true);
      });
      if (form.isValid && form?.dirty) {
        // mutate({
        //   name: values.name,
        // });
        mutate({
          month: form.values.month,
        });
      }
    },
  });
  return (
    <div className="w-[39vw] p-2">
      <div className=" border-b-[1px] border-mountain-mist-200">
        <h4 className="text-ebony-950 font-bold text-[1.6rem] leading-[2.4rem]">
          Generate Bills
        </h4>
        <p className="text-mountain-mist-300 text-[0.99rem] font-extralight">
          Compute all bills for a certain period
        </p>
      </div>

      <div className="my-6">
        <CustomSelect
          boldText
          options={monthNames}
          id={"month"}
          label={"Select billing period month"}
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

export default GenerateBillModal;
