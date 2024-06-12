import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/shared/InputField";
import { useMutation } from "react-query";
import { signInMutation } from "../api/mutation/auth";
const SignInContainer = () => {
  const r = useNavigate();
  const { ...form } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (v: any) => {},
  });

  const { data, isLoading, mutate } = useMutation({
    mutationFn: signInMutation,
    onSuccess(data, variables, context) {
      if(data?.data?.status){
        localStorage.setItem('auth', data?.data?.data)
        r('/dashboard')
      }
    },
  });

  function handleOnSubmit() {
    mutate({
      email: form.values.email,
      password: form.values.password,
    });
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
        className="bg-mantis-950/90 hover:bg-mantis-950 duration-500 text-[#ffffff] py-2 rounded-md font-medium"
        onClick={() => {
          handleOnSubmit();
        }}
      >
        {isLoading ? "Loading..." : "Sign in"}
      </button>
    </div>
  );
};

export default SignInContainer;
