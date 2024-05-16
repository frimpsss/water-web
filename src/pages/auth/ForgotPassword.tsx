import ForgotPasswordContainer from "../../containers/ForgotPasswordContainer";

const ForgotPassword: React.FC = () => {
  return (
    <div className="w-[27rem]">
      <div className="flex flex-col gap-1 mb-6">
        <h4 className="font-semibold text-3xl text-mantis-950">
          Forgot your password?
        </h4>
        <p className="font-light text-base text-mountain-mist-400">
          Enter your email address to receive an email with a verification code.
        </p>
      </div>
      <ForgotPasswordContainer />
    </div>
  );
};

export default ForgotPassword;
