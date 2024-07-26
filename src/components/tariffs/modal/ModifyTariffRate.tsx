import { useMutation } from "react-query";
import { changeTariffRate } from "../../../api/mutation/tariffs";
import { toast } from "sonner";
import * as Y from "yup";
import { useFormik } from "formik";
import TextInput from "../../shared/InputField";
import Spinner from "../../shared/Spinner";
const ModifyTariffRate = ({ closeModal, id }: any) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: changeTariffRate,
    mutationKey: ["change-rate"],
    onError: (error) => {
      toast.error("An error occured");
    },
    onSuccess: (data) => {
      toast.success("Operation succesful");
    },
    onSettled: () => {
      closeModal();
    },
  });
  const validationSchema = Y.object().shape({
    effectiveTo: Y.date().required("Effective To date is required"),
    newRate: Y.number().required("Rate is required"),
  });
  const { ...form } = useFormik({
    initialValues: {
      newRate: "",
      effectiveTo: "",
    },
    onSubmit(values, formikHelpers) {
      Object.keys(values)?.map((e) => {
        form.setFieldTouched(e, true);
      });
      if (form.isValid && form?.dirty) {
        mutate({
          id: id,
          newRate: parseInt(values.newRate),
          effectiveTo: values.effectiveTo,
        });
      }
    },
  });
  return (
    <div className="w-[39vw] p-2">
      <div className=" border-b-[1px] border-mountain-mist-200">
        <h4 className="text-ebony-950 font-bold text-[1.6rem] leading-[2.4rem]">
          Create New Tariff
        </h4>
        <p className="text-mountain-mist-300 text-[0.99rem] font-extralight">
          Create a new Tariff Class
        </p>
      </div>

      <div className="p-1 grid grid-cols-1 gap-6 pt-5">
        <TextInput
          id={"newRate"}
          boldenText={true}
          type={"number"}
          placeholder={"e.g. 1.3"}
          label={"Rate"}
          {...form}
        />
        <TextInput
          boldenText={true}
          id={"effectiveTo"}
          type={"date"}
          placeholder={"e.g. 1.3"}
          label={"Effective To"}
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

export default ModifyTariffRate;
