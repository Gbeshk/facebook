import * as yup from "yup";

export const SignUpSchema = yup.object().shape({
  firstName: yup.string().required("Can't be empty"),
  lastName: yup.string().required("Can't be empty"),
  email: yup
    .string()
    .email("It must be a valid email address")
    .required("Email can't be empty"),
  password: yup
    .string()
    .required("Password can't be empty")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password can't be more than 20 characters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zAZ]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  day: yup
    .number()
    .required("Day is required")
    .min(1, "Invalid day")
    .max(31, "Invalid day"),
  month: yup
    .number()
    .required("Month is required")
    .min(1, "Invalid month")
    .max(12, "Invalid month"),
  year: yup
    .number()
    .required("Year is required")
    .min(1900, "Invalid year")
    .max(2023, "Invalid year"),
    gender: yup
    .string()
    .oneOf(["female", "male", "other"], "Gender must be one of 'female', 'male', or 'other'")
    .required("Gender is required"),
});
