import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Box, Drawer, Button, Typography } from '@material-ui/core';
import ProductCard from './components/ProductCard';
import ShoppingCart from './components/ShoppingCart';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Message } from "rbx";
import "rbx/index.css";


const firebaseConfig = {
  apiKey: "AIzaSyATMi1DINGTMvJBO6TXWyrjBjaneBOwveM",
  authDomain: "shopping-cart-7eefc.firebaseapp.com",
  databaseURL: "https://shopping-cart-7eefc.firebaseio.com",
  projectId: "shopping-cart-7eefc",
  storageBucket: "shopping-cart-7eefc.appspot.com",
  messagingSenderId: "1075129302064",
  appId: "1:1075129302064:web:0a749def94dd57508e01f5",
  measurementId: "G-701PL9G45W"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

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
  const [inventory, setInventory] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  // useEffect(() => {
  //   const fetchInventory = async () => {
  //     const response = await fetch('./data/inventory.json');
  //     const json = await response.json();
  //     console.log(json)
  //     setInventory(json);
  //   };
  //   fetchInventory();
  // }, []);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) setInventory(snap.val());
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  console.log(inventory)

  const [spacing, setSpacing] = useState(2);
  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setVisibleCart(open);
  };

  const Banner = ({ user, title }) => (
    <React.Fragment>
      { user ? <Welcome user={ user } /> : <SignIn /> }
      <h3>{ title || '[loading...]' }</h3>
    </React.Fragment>
  );

  const Welcome = ({ user }) => (
    <Message color="info">
      <Message.Header>
        Welcome, {user.displayName}
        <Button primary onClick={() => firebase.auth().signOut()}>
          Log out
        </Button>
      </Message.Header>
    </Message>
  );

  const SignIn = () => (
    <StyledFirebaseAuth
      uiConfig={uiConfig}
      firebaseAuth={firebase.auth()}
    />
  );

  console.log(inventory)
  console.log(inventory[0])

  const checkout = () => {
    // update the inventory to remove what is being checked out from cart
    setCartItems([])
    setCartTotal(0)
  };

  return (
    <div>
    <Banner title="Ava's Store" user={ user } />
    <Button onClick={toggleDrawer(true)}>CART</Button>
    <Grid container justify="center" spacing={spacing}>
      {products.map((product, idx) =>
        <Grid key={product.sku} item>
          <ProductCard product={product} product_id={product_ids[idx]} cartState={ {cartItems, setCartItems}} visibleCartState = {{visibleCart, setVisibleCart}} cartTotalState = {{cartTotal, setCartTotal}}  inventoryState = {{inventory, setInventory}} userState = {{user, setUser}}/>
        </Grid>
      )}
    </Grid>
    <Drawer anchor='right' open={visibleCart} onClose={toggleDrawer(false)}>
      {cartItems.map((product) =>
          <Grid key={product.sku} item>
            <ShoppingCart products={products} product={product} cartState={{cartItems, setCartItems}} cartTotalState = {{cartTotal, setCartTotal}} inventoryState = {{inventory, setInventory}} userState = {{user, setUser}}/>
          </Grid>
        )}
      <Typography>
        Cart total: $ {cartTotal.toFixed(2)}
      </Typography>
      <Button onClick={checkout}>CHECKOUT</Button>
    </Drawer>
    </div>
  );
};

export default App;