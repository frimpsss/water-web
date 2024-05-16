import SignInContainer from "../../containers/SignInContainer";

function Signin() {
  return (
    <div className="w-[27rem]">
      <div className="flex flex-col gap-1 mb-6">
        <h4 className="font-semibold text-3xl text-mantis-950">
          Sign in to your account
        </h4>
        <p className="font-light text-base text-mountain-mist-400">
          Enter your credentials below
        </p>
      </div>

      <SignInContainer />
    </div>
  );
}

export default Signin;
