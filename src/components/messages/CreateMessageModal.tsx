import * as Y from "yup";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { sendMessage } from "../../api/mutation/_message";
import Spinner from "../shared/Spinner";
import { useFormik } from "formik";
import { useState } from "react";
import TextArea from "../shared/TextArea";
import TextInput from "../shared/InputField";
import { Checkbox } from "@headlessui/react";

const CreateMessageModal = ({ closeModal }: { closeModal: () => void }) => {
  const [sendPush, setSendPush] = useState<boolean>(false);
  const { mutate, isLoading } = useMutation({
    mutationFn: sendMessage,
    mutationKey: ["send-message"],
    onError: (error) => {
      toast.error("An error occured");
    },
    onSuccess: (data) => {
      toast.success("Message sent succesfully");
    },
    onSettled: () => {
      closeModal();
    },
  });
  const validationSchema = Y.object().shape({
    title: Y.string().required("Title is required"),
    message: Y.string().required("Message is required"),
  });
  const { ...form } = useFormik({
    initialValues: {
      title: "",
      message: "",
    },
    validationSchema,
    onSubmit(values, formikHelpers) {
      Object.keys(form.values)?.map((e) => {
        form.setFieldTouched(e, true);
      });
      if (form.isValid && form?.dirty) {
        mutate({
          title: values.title,
          message: values.message,
          sendPushNotif: sendPush,
        });
      }
    },
  });
  return (
    <div className="w-[39vw] p-2">
      <div className=" border-b-[1px] border-mountain-mist-200">
        <h4 className="text-ebony-950 font-bold text-[1.6rem] leading-[2.4rem]">
          Send Message
        </h4>
        <p className="text-mountain-mist-300 text-[0.99rem] font-extralight">
          Send messages to users
        </p>
      </div>
      <div
        // onSubmit={form.handleSubmit}
        className="grid grid-cols-1 gap-6 pt-6 px-1"
      >
        <TextInput
          id={"title"}
          boldenText={true}
          type={"text"}
          placeholder={"e.g. Welcome to Aquatrack"}
          label={"Title"}
          {...form}
        />
        <TextArea
          boldenText
          id={"message"}
          type={"number"}
          placeholder={"Enter message here"}
          label={"Message"}
          {...form}
        />

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name=""
            id=""
            className="checked:bg-tremor-background-emphasis"
            onChange={() => {
              setSendPush(!sendPush);
            }}
          />
          <h4 className="font-bold text-mantis-950">Send push notification</h4>
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
          {isLoading ? <Spinner stroke="#fff" /> : "send"}
        </button>
      </div>
    </div>
  );
};

export default CreateMessageModal;
