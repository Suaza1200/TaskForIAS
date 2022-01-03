import React from "react";
import { Link as RouterLink } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import Link from "@mui/material/Link";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import usePromise from "../../../shared/use-promise";
import productClient from "../api";
import { Product } from "../types";

function productToRow(product: Product) {
  return (
    <TableRow key={product.id}>
      <TableCell>
        <Link component={RouterLink} to={`${product.id}/details`}>
          {product.id}
        </Link>
      </TableCell>
      <TableCell align="right">{product.name}</TableCell>
      <TableCell align="right">{product.birthday}</TableCell>
    </TableRow>
  );
}

function ProductsTable() {
  const { isLoading, error, data } = usePromise(() =>
    productClient.listProduct()
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <h1>Hubo un error</h1>;
  }

  if (data) {
    const product = data.map((product) => productToRow(product));
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Precio del producto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{product}</TableBody>
        </Table>
      </TableContainer>
    );
  }

  return null;
}

export default ProductTable;
