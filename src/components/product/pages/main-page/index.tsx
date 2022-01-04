import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";
import Table from "../../table";

type LinkProps = {
  to: string;
};
const LinkBehavior = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link ref={ref} {...props} role={undefined} />
);

function ProductMainPage() {
  return (
    <>
      <Typography variant="h3" component="div" gutterBottom>
        Lista de productos
      </Typography>
      <Button component={LinkBehavior} to="create" variant="contained">
        Crear producto
      </Button>
      <Table />
    </>
  );
}

export default ProductMainPage;
