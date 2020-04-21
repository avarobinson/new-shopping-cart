import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Box, Drawer, Button, Typography } from '@material-ui/core';
import ProductCard from './components/ProductCard';
import ShoppingCart from './components/ShoppingCart';
// import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const App = () => {
  const [data, setData] = useState({});
  const product_ids = Object.keys(data);
  const products = Object.values(data);
  const [visibleCart, setVisibleCart] = useState(false)
  const [cartItems, setCartItems] = useState([])  
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  const [spacing, setSpacing] = useState(2);
  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setVisibleCart(open);
  };

  return (
    <div>
    <Button onClick={toggleDrawer(true)}>CART</Button>
    <Grid container justify="center" spacing={spacing}>
      {products.map((product, idx) =>
        <Grid key={product.sku} item>
          <ProductCard product={product} product_id={product_ids[idx]} cartState={ {cartItems, setCartItems}} visibleCartState = {{visibleCart, setVisibleCart}} cartTotalState = {{cartTotal, setCartTotal}}/>
        </Grid>
      )}
    </Grid>
    <Drawer anchor='right' open={visibleCart} onClose={toggleDrawer(false)}>
      {cartItems.map((product) =>
          <Grid key={product.sku} item>
            <ShoppingCart products={products} product={product} cartState={{cartItems, setCartItems}}/>
          </Grid>
        )}
      <Typography>
        Cart total: $ {cartTotal}
      </Typography>
    </Drawer>
    </div>
  );
};

export default App;