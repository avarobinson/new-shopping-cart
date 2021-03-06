import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    justifyContent: "center",
  },
  media: {
    height: 300,
    width: "auto",
  },
});

const handleRemove = ({cartState, cartTotalState, inventoryState, userState}, product, size) => {
    let currentCartItems = cartState.cartItems
    console.log(currentCartItems)
    currentCartItems = currentCartItems.filter(p => {
        return(
        !(p.sku === product.sku && p.size === size)
        )
    })
    console.log(currentCartItems)
    cartState.setCartItems(currentCartItems)
    let updatedPrice = cartTotalState.cartTotal
    updatedPrice = updatedPrice - product.price
    cartTotalState.setCartTotal(updatedPrice)

    let newInv = inventoryState.inventory;
    newInv[product.sku][size] = newInv[product.sku][size] + 1;
    inventoryState.setInventory(newInv)

    const userUID = userState.user.uid;
    console.log("length of cart state")
    console.log(cartState.cartItems.length)
    if(cartState.cartItems.length == 1){
      firebase.database().ref("carts/" + userUID).remove();
    }
    else{
      firebase.database().ref("carts/" + userUID).set(cartState.cartItems);
    }
  };

const ShoppingCart = ({products, product, cartState, cartTotalState, inventoryState, userState}) =>{
    const classes = useStyles();
    const img_src = "data/products/" + product.sku + "_1.jpg"

    let product_info = products.filter(p => p.sku === product.sku);
    product_info = product_info[0];
    
    return (
    <Card className={classes.root}>
        <CardActionArea>
        <CardMedia 
            component="img"
            className={classes.media}
            src={img_src}
            title={product_info.title}
        />
        <CardContent>
            <Typography gutterBottom variant="h10" component="h2">
                {product_info.title}
            </Typography>
            <Typography gutterBottom variant="body2" component="p">
                {product_info.currencyFormat} {product_info.price}
            </Typography>
        </CardContent>
        <CardActions>
        <Button size="small" color="primary"
        onClick = { () => handleRemove({cartState, cartTotalState, inventoryState, userState}, product_info, product.size)}
        >
            Remove
          </Button>
      </CardActions>
        </CardActionArea>
    </Card>
    )
};

export default ShoppingCart;