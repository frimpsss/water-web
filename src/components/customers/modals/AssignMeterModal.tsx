import { XMarkIcon } from "@heroicons/react/16/solid";
import { useFormik } from "formik";
import TextInput from "../../shared/InputField";
import CustomSelect from "../../shared/Select";
import * as T from "yup";
import { useMutation } from "react-query";
import { assignMeter } from "../../../api/mutation/meter";
import { toast } from "sonner";
import Spinner from "../../shared/Spinner";

const AssignMeterModal = ({
  data,
  closeModal,
}: {
  data: any;
  closeModal: () => void;
}) => {
  const validationSchema = T.object().shape({
    gpsAddress: T.string().required("GPS Address is required"),
    meterType: T.string().required("Meter type is required"),
  });
  const { ...form } = useFormik({
    initialValues: {
      gpsAddress: "",
      meterType: "",
    },
    validationSchema: validationSchema,
    onSubmit(values) {
      Object.keys(form.values)?.map((e) => {
        form.setFieldTouched(e, true);
      });
      if (form.isValid && form?.dirty) {
        mutate({
          id: data?._id,
          gpsAddress: values.gpsAddress,
          meterType: values.meterType,
        });
      }
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: assignMeter,
    onSuccess: () => {
      toast.success("Meter assigned succesfully");
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
    onSettled: () => {
      closeModal();
    },
  });
  return (
    <div className="w-[40vw]">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-ebony-950 font-bold text-[1.4rem] leading-[2.4rem]">
            Assign Meter
          </h4>
          <p className="text-mountain-mist-300 text-[1rem] font-light">
            Assign a meter to a customer.
          </p>
        </div>
        <button
          className="border-[#000] border-[2px] rounded-md"
          onClick={closeModal}
        >
          <XMarkIcon className="text-[#000] h-5" color="#000000" />
        </button>
      </div>
      <div className="grid grid-cols-2 mt-6 gap-4">
        <TextInput
          boldenText={true}
          type={"text"}
          label="GPS Address"
          placeholder="MD-323-3244"
          id="gpsAddress"
          {...form}
        />
        <CustomSelect
          boldText={true}
          options={["RESIDENTIAL", "INDUSTRIAL"]}
          id={"meterType"}
          label={"Meter Type"}
          {...form}
        />
      </div>
      <div className="mt-6 mb-3 grid grid-cols-4 justify-end">
        <button
          className="bg-mantis-950 text-white-50 col-start-4 col-end-5 font-bold px-3 py-2 rounded-md"
          onClick={() => {
            form.handleSubmit();
          }}
        >
          {isLoading ? <Spinner stroke="#fff" /> : "Assign Meter"}
        </button>
      </div>
    </div>
  );
};

export default AssignMeterModal;
