import { useFormik } from "formik";
import * as Y from "yup";
import TextInput from "../../shared/InputField";
import TextArea from "../../shared/TextArea";
import { useMutation } from "react-query";
import { createNewTariff } from "../../../api/mutation/tariffs";
import { toast } from "sonner";
import Spinner from "../../shared/Spinner";

const CreateTarrifModal = ({ closeModal }: any) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createNewTariff,
    mutationKey: ["create-tariff"],
    onError: (error) => {
      toast.error("An error occured");
    },
    onSuccess: (data) => {
      toast.success("Tariff created succesfully");
    },
    onSettled: () => {
      closeModal();
    },
  });
  const validationSchema = Y.object().shape({
    name: Y.string().required("Name is required"),
    rate: Y.number().required("Rate is required"),
    //   .typeError("Rate has to be a number"),
    description: Y.string().required("Descriptions is required"),
    effectiveFrom: Y.string().required("Effective From date is required"),
    effectiveTo: Y.date().required("Effective To date is required"),
  });
  const { ...form } = useFormik({
    initialValues: {
      name: "",
      rate: "",
      description: "",
      effectiveFrom: "",
      effectiveTo: "",
    },
    validationSchema,
    onSubmit(values) {
      // window.alert(JSON.stringify(values))
      Object.keys(form.values)?.map((e) => {
        form.setFieldTouched(e, true);
      });
      if (form.isValid && form?.dirty) {
        mutate({
          name: values.name,
          rate: values.rate,
          startDate: values.effectiveTo,
          endDate: values.effectiveTo,
          description: values.description,
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

      <div
        // onSubmit={form.handleSubmit}
        className="grid grid-cols-2 gap-6 pt-6 px-1"
      >
        <TextInput
          id={"name"}
          boldenText={true}
          type={"text"}
          placeholder={"e.g. E levy"}
          label={"Name"}
          {...form}
        />
        <TextInput
          id={"rate"}
          boldenText={true}
          type={"number"}
          placeholder={"e.g. 1.3"}
          label={"Rate"}
          {...form}
        />
        <TextInput
          id={"effectiveFrom"}
          boldenText={true}
          type={"date"}
          placeholder={"e.g. 1.3"}
          label={"Effective From"}
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
        <div className="col-span-2">
          <TextArea
            boldenText={true}
            id={"description"}
            type={"text"}
            placeholder={"E.g. Levy to fix broken pipes..."}
            label={"Description"}
            {...form}
          />
        </div>
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

export default CreateTarrifModal;
