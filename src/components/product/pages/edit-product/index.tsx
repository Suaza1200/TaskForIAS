import React from 'react'
import { useLocation, useNavigate } from 'react-router';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import personsClient from "../../api";

const validationSchema = yup.object({
  price: yup.number().positive("el numero debe ser positivo").min(1).required("Requerido"),
  name: yup
    .string()
    .required("Requerido")
    .matches(/^[a-zA-Z\s:]{2,64}$/, "Nombre inválido"),
  description: yup.string().required("Requerido"),
  quantity: yup.number().positive("el numero debe ser positivo").max(100).min(1).required("Requerido")
});

type FormValues = {
  name: string;
  price: number | null;
  description: string;
  quantity: number | null;
};

const initialValues: FormValues = {
  price: null,
  name: "",
  description: "",
  quantity: null,
};


export default function EditProduct() {
  const navigate = useNavigate();
  const data: any = useLocation();

  const handleSubmit = async (
    formValues: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    await personsClient.updateProduct(data.state.id, formValues);

    helpers.resetForm({
      values: initialValues,
    });

    navigate("/");
  };

  return (
    <Formik<FormValues>
      initialValues={data.state}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => {
        return (
          <form onSubmit={formikProps.handleSubmit} style={{ display: "grid", margin: "15rem", gap: "1rem" }}>
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
            <TextField
              name="price"
              label="Precio"
              variant="outlined"
              value={formikProps.values.price}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              error={
                formikProps.errors.price !== undefined &&
                formikProps.touched.price
              }
              helperText={formikProps.errors.price || ""}
            />
            <TextField
              name="description"
              label="Descripción"
              variant="outlined"
              value={formikProps.values.description}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              error={
                formikProps.errors.description !== undefined &&
                formikProps.touched.description
              }
              helperText={formikProps.errors.description || ""}
            />
            <TextField
              name="quantity"
              label="Cantidad"
              variant="outlined"
              value={formikProps.values.quantity}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              error={
                formikProps.errors.quantity !== undefined &&
                formikProps.touched.quantity
              }
              helperText={formikProps.errors.quantity || ""}
            />



            <Button
              variant="outlined"
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
