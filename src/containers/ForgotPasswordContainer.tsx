import { useFormik } from "formik";
import TextInput from "../components/shared/InputField";
import { useNavigate } from "react-router-dom";

const ForgotPasswordContainer = () => {
  const r = useNavigate();
  const { ...form } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit(values, formikHelpers) {},
  });
  return (
    <form className="flex flex-col gap-6">
      <TextInput
        type={"text"}
        placeholder={"e.g. admin@aquatrack.com"}
        label={"Email"}
        id="email"
        {...form}
      />
      <p
        className="text-right text-[#000] cursor-pointer"
        onClick={() => {
          r("/auth/login");
        }}
      >
        Remember your password?{" "}
        <span className="font-medium  text-mantis-950">Login</span>
      </p>
      <button
        type="submit"
        className="bg-mantis-950/90 hover:bg-mantis-950 duration-500 text-[#ffffff] py-2 rounded-md font-medium"
      >
        Send reset code
      </button>
    </form>
  );
};

export default ForgotPasswordContainer;
