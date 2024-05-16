import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/shared/InputField";
const SignInContainer = () => {
  const r = useNavigate();
  const { ...form } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (v: any) => {},
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
      <TextInput
        type={"password"}
        placeholder={"e.g. •••••••••••••"}
        label={"Password"}
        id="password"
        {...form}
      />

      <p
        className="text-right text-mantis-950 font-medium cursor-pointer"
        onClick={() => {
          r("/auth/forgot-password");
        }}
      >
        Forgot your password?
      </p>
      <button
        type="submit"
        className="bg-mantis-950/90 hover:bg-mantis-950 duration-500 text-[#ffffff] py-2 rounded-md font-medium"
        onClick={() => {
          r("/dashboard");
        }}
      >
        Sign In
      </button>
    </form>
  );
};

export default SignInContainer;
