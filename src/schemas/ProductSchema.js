import * as yup from "yup";

let productSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().required().positive("Please enter positive number !"),
  description: yup.string("Please shortly describe the product").required(),
  image: yup.string().url("Please enter a valid url !"),
});

export default productSchema;
