import * as yup from "yup";

export const Loginschema = yup.object().shape({
  email: yup.string().email("It must be e-mail").required("Can't be empty"),
  password: yup
    .string()
    .required("Can't be empty")
    .min(8, "Minimum 8 symbol")
    .max(20, "Maximum 20 Symbol")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Invalid Password"
    ),
});