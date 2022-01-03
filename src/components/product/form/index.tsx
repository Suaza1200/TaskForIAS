import { Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import personsClient from "../api";

const validationSchema = yup.object({
  price: yup.date().required("Requerido"),
  name: yup
    .string()
    .required("Requerido")
    .matches(/^[a-zA-Z\s:]{10,64}$/, "Nombre inválido"),
});

type FormValues = {
  name: string;
  price: number | null;
};

const initialValues: FormValues = {
  price: null,
  name: "",
};

function ProductForm() {
  const navigate = useNavigate();

  const handleSubmit = async (
    formValues: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    await productsClient.createProduct(formValues);

    helpers.resetForm({
      values: initialValues,
    });

    navigate("/");
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => {
        return (
          <form onSubmit={formikProps.handleSubmit}>
            <TextField
              name="name"
              label="Nombre"
              variant="outlined"
              value={formikProps.values.name}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              error={
                formikProps.errors.name !== undefined &&
                formikProps.touched.name
              }
              helperText={formikProps.errors.name || ""}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Precio del producto"
                clearable={true}
                value={formikProps.values.birthday}
                onChange={(newValue) => {
                  formikProps.setFieldValue("price", newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onBlur={formikProps.handleBlur}
                    name="price"
                    error={
                      formikProps.errors.price !== undefined &&
                      formikProps.touched.price
                    }
                    helperText={formikProps.errors.price || ""}
                  />
                )}
              />
            </LocalizationProvider>

            <Button
              variant="text"
              type="submit"
              disabled={!formikProps.isValid || !formikProps.dirty}
            >
              Guardar
            </Button>
          </form>
        );
      }}
    </Formik>
  );
}

export default ProductForm;
