import * as yup from "yup";

let loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required(),
  password: yup.string().min(6, "The password should be at least 6 characters").required(),
});

export default loginSchema;
