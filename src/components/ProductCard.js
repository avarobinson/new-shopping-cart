import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

const handleCart = ({cartState, visibleCartState, cartTotalState, product, inventoryState, product_id}, size) => {
  let currentCartItems = cartState.cartItems
  currentCartItems.push({sku: product.sku, size: size})
  cartState.setCartItems(currentCartItems)
  visibleCartState.setVisibleCart(true)
  let updatedPrice = cartTotalState.cartTotal
  updatedPrice = updatedPrice + product.price
  cartTotalState.setCartTotal(updatedPrice)

  let newInv = inventoryState.inventory;
  newInv[product_id][size] = newInv[product_id][size] - 1;
  inventoryState.setInventory(newInv)
};

const ProductCard = ({product, product_id, cartState, visibleCartState, cartTotalState, inventoryState}) =>{
    const classes = useStyles();
    const img_src = "data/products/" + product_id + "_1.jpg"
    let inventoryOfProduct = inventoryState.inventory[product_id]

    const checkInventory = (size) => {
      if (inventoryOfProduct){
        if (inventoryOfProduct[size] === 0){
          return true;
        }
        else{
          return false;
        }
      }
      else{
        return true;
      }
    };

    const buttonMessage = (size) => {
      let disabled = checkInventory(size)
      if(disabled) {
        return size + ' OUT OF STOCK';
      }
      else{
        return size;
      }
    };


    return (
    <Card className={classes.root}>
        <CardActionArea>
        <CardMedia 
            component="img"
            className={classes.media}
            src={img_src}
            title={product.title}
        />
        <CardContent>
            <Typography gutterBottom variant="h10" component="h2">
                {product.title}
            </Typography>
            <Typography gutterBottom variant="body2" component="p">
                {product.currencyFormat} {product.price}
            </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary"
            onClick = { () => handleCart({cartState, visibleCartState, cartTotalState, product, inventoryState, product_id}, 'S')}
            disabled = {checkInventory('S')}
          >
            {buttonMessage('S')}
          </Button>
          <Button size="small" color="primary"
            onClick = { () => handleCart({cartState, visibleCartState, cartTotalState, product, inventoryState, product_id}, 'M')}
            disabled = {checkInventory('M')}
        >
            {buttonMessage('M')}
          </Button>
          <Button size="small" color="primary"
            onClick = { () => handleCart({cartState, visibleCartState, cartTotalState, product, inventoryState, product_id}, 'L')}
            disabled = {checkInventory('L')}
            >
            {buttonMessage('L')}
          </Button>
          <Button size="small" color="primary"
            onClick = { () => handleCart({cartState, visibleCartState, cartTotalState, product, inventoryState, product_id}, 'M')}
            disabled = {checkInventory('XL')}
          >
            {buttonMessage('XL')}
          </Button>
      </CardActions>
        </CardActionArea>
    </Card>
    )
};

export default ProductCard;