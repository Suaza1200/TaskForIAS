import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { red } from "@mui/material/colors";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from 'react';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import usePromise from "../../../shared/use-promise";
import productClient from "../api";
import { Product } from "../types";

// function productToRow(product: Product, history: any, cart: any[]) {

//   const addToShoppingList = async (product: Product) => {
//     let { id, quantity } = product;

//     let existingProduct = cart.find(p => p.id === id);

//     if (existingProduct) {
//       existingProduct.quantity += quantity;
//     } else {
//       cart.push(product);
//     }

//     return {
//       ...cart
//     }
//   }
//   return (
//     <TableRow key={product.id}>
//       <TableCell>
//         <RouterLink to={`${product.id}/details`}>
//           {product.id}
//         </RouterLink>
//       </TableCell>
//       <TableCell align="right">{product.name}</TableCell>
//       <TableCell align="right">{product.price}</TableCell>
//       <TableCell align="right">{product.description}</TableCell>
//       <TableCell align="right">{product.quantity}</TableCell>
//       <TableCell align="right">
//         <Button onClick={() => addToShoppingList(product)}>
//           <Link>
//             <PlusOneIcon />
//           </Link>
//         </Button>
//         <Button onClick={() => history(`${product.id}/edit`, { state: product })}>
//           <Link>
//             <EditIcon />
//           </Link>
//         </Button>
//         <Button onClick={() => Swal.fire({
//           title: 'Borrar',
//           text: '¿Quiere continuar?',
//           icon: 'warning',
//           cancelButtonText: 'No, cancelar',
//           confirmButtonText: 'Si',
//           confirmButtonColor: 'darkred',
//           showCancelButton: true
//         }).then(({ value }) => {
//           if (value) {
//             productClient.deleteProduct(product.id).then((res) => console.log(res));
//             Swal.fire('Borrado', 'El producto ha sido borrado', 'success').then(() => window.location.reload());
//           }
//         })}>
//           <Link>
//             <DeleteForeverIcon sx={{ color: red[500] }} />
//           </Link>
//         </Button>
//       </TableCell>
//     </TableRow>
//   );
// }

const oldcart = JSON.parse(localStorage.getItem('cart') || '[]');

function ProductsTable() {
  const [cart, setCart] = React.useState(oldcart)

  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const history = useNavigate();
  const { isLoading, error, data } = usePromise(() =>
    productClient.listProduct()
  );
  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <h1>Hubo un error</h1>;
  }

  const addToShoppingList = (product: Product) => {
    let arrayCopy = [...cart];
    arrayCopy.push(product);
    setCart(arrayCopy);
  }

  if (data) {
    // const product = data.map((product) => productToRow(product, history, cart));
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Precio del producto</TableCell>
              <TableCell align="right">Detalle</TableCell>
              <TableCell align="right">Cantidad disponible</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>{product}</TableBody> */}
          <TableBody>
            {data.map((product: Product) => (

              <TableRow key={product.id}>
                <TableCell>
                  <RouterLink to={`${product.id}/details`}>
                    {product.id}
                  </RouterLink>
                </TableCell>
                <TableCell align="right">{product.name}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">{product.description}</TableCell>
                <TableCell align="right">{product.quantity}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => addToShoppingList(product)}>
                    <Link>
                      <PlusOneIcon />
                    </Link>
                  </Button>
                  <Button onClick={() => history(`${product.id}/edit`, { state: product })}>
                    <Link>
                      <EditIcon />
                    </Link>
                  </Button>
                  <Button onClick={() => Swal.fire({
                    title: 'Borrar',
                    text: '¿Quiere continuar?',
                    icon: 'warning',
                    cancelButtonText: 'No, cancelar',
                    confirmButtonText: 'Si',
                    confirmButtonColor: 'darkred',
                    showCancelButton: true
                  }).then(({ value }) => {
                    if (value) {
                      productClient.deleteProduct(product.id).then((res) => console.log(res));
                      Swal.fire('Borrado', 'El producto ha sido borrado', 'success').then(() => window.location.reload());
                    }
                  })}>
                    <Link>
                      <DeleteForeverIcon sx={{ color: red[500] }} />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return null;
}

export default ProductsTable;
