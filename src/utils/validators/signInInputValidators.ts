import * as Y from "yup";

export const SignInValidator = Y.object().shape({
  email: Y.string().email("Invalid email").required("Email is required"),
  password: Y.string().required("Password is required"),
});
