import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/shared/InputField";
import { useMutation } from "react-query";
import { signInMutation } from "../api/mutation/auth";
import { SignInValidator } from "../utils/validators/signInInputValidators";
import { toast } from "sonner";
import Spinner from "../components/shared/Spinner";
const SignInContainer = () => {
  const r = useNavigate();
  const { ...form } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInValidator,
    onSubmit: (v: any) => {},
  });

  const { data, isLoading, mutate } = useMutation({
    mutationFn: signInMutation,
    onSuccess(data, variables, context) {
      if (data?.data?.status) {
        localStorage.setItem("auth", data?.data?.data);
        r("/dashboard");
      }
    },
    onError(error: any, variables, context) {
      toast.error(error?.message ?? "An error occured");
      form.resetForm()
    },
  });

  function handleOnSubmit() {
    Object.keys(form?.values)?.forEach((e) => {
      form.setFieldTouched(e, true);
    });

    if (form.isValid && form?.dirty) {
      mutate({
        email: form.values.email,
        password: form.values.password,
      });
    }
  }
  return (
    <div className="flex flex-col gap-6" onSubmit={() => form.handleSubmit()}>
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
        className="bg-mantis-950/90 hover:bg-mantis-950 duration-500 text-[#ffffff] py-2 rounded-md font-medium grid place-items-center"
        onClick={() => {
          handleOnSubmit();
        }}
      >
        {isLoading ? <Spinner stroke="#ffffff" /> : "Sign in"}
      </button>
    </div>
  );
};

export default SignInContainer;
