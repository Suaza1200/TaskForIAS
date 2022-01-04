import Inventory2Icon from '@mui/icons-material/Inventory2';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Button, Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { Product } from '../../components/product/types';

export default function CustomDrawer({ open, setOpen }: any) {
  let cart: Product[] = new Array<Product>();
  let total: number = 0;


  cart = JSON.parse(localStorage.getItem('cart') || '[]');

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setOpen(!open)}
    >
      <List>
        <Typography variant="h6" component="div">Shopping car</Typography>
        {cart.map((product: Product, index: number) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <Inventory2Icon />
            </ListItemIcon>
            <ListItemText primary={product.name} />
            <ListItemText style={{ visibility: "hidden" }} primary={total += product.price} />
          </ListItem>
        ))}
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText primary={total} />
          <Button onClick={() => {
            localStorage.clear();
            window.location.reload()
          }}>
          <RemoveShoppingCartIcon />
        </Button>
      </ListItem>
    </List>
    </Box >
  );

  return (
    <React.Fragment>
      <Drawer
        anchor='right'
        open={open}
        onClose={() => setOpen(!open)}
      >
        {list()}
      </Drawer>
    </React.Fragment>
  );
}
