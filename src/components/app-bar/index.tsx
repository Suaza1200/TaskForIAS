import React from 'react';
import { Button, Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CustomDrawer from "../../shared/components/Drawer";

function ApplicationBar() {
  const [show, setShow] = React.useState(false);
  const toggleModal = () => {
    setShow(!show);
  };
  return (
    <div>
      {show ? (
        <CustomDrawer open={show} setOpen={toggleModal} />
      ): (
        <AppBar position="static">
          <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <a href="/" style={{ textDecoration: "none", color: "white"}}>Products App</a>
              </Typography>
            <Button color="inherit" onClick={toggleModal}>
              <ShoppingCartIcon fontSize="large" />
            </Button>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}

export default ApplicationBar;
