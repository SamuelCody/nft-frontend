import * as yup from "yup";

const nftValidatorSchema = yup.object().shape({
  address: yup.string().required("Provide an address"),
  chain: yup.string().required("Select a chain"),
});

export default nftValidatorSchema;
